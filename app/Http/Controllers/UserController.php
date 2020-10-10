<?php

// namespace App\Http\Controllers\API;
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = auth()->user();

        return response()->json(compact('token', 'user'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    /*
     * Set score of user after quiz completion
     */
    public function setUserScore(Request $request) {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json('User not found', 403);
        } catch (TokenExpiredException $e) {
            return response()->json('User not found', 403);
        } catch (TokenInvalidException $e) {
            return response()->json('User not found', 403);
        }

        $response = '';
        $this->validate($request, [
            'userId' => 'int',
            'score' => 'int',
            'quizId' => 'int'
        ]);

        $request_user_id = $request->input('userId');
        $user_id = strval($user->id);

        if($request_user_id == $user_id) {
            $user_finished_quizes = $user->finished_quizes;
            $response_encoded = $user_finished_quizes;
            $finished_quiz_id = $request->input('quizId');
            $finished_quiz_score = $request->input('score');
            $response_decoded = [];
            $first_time_complete = true;

            if(!empty($response_encoded)) {
                $response_decoded = json_decode(urldecode($response_encoded));
            }

            // check if user already did the quiz, if yes, compare his scores and take bigger one
            foreach ($response_decoded as $key=>$value) {
                $finished_quiz = $response_decoded[$key];
                $quiz_id = $finished_quiz[0];
                $quiz_score = $finished_quiz[1];

                if((int)$quiz_id == (int)$finished_quiz_id) {
                    $first_time_complete = false;

                    if((int)$finished_quiz_score > (int)$quiz_score) {
                        $response_decoded[$key][1] = $finished_quiz_score;
                    }
                }
            }

            // push new value
            if($first_time_complete) {
                $newValue = [
                    $finished_quiz_id,
                    $finished_quiz_score
                ];

                array_push($response_decoded, $newValue);
            }

            $response = $response_decoded;
            // encode value and push user row
            $response_encoded_final = urlencode(json_encode($response));
            $user->finished_quizes = $response_encoded_final;
            $user->save();
        } else {
            $response = 'User authentication error!';
        }

        return response()->json($response, 201);
    }

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));
    }
}

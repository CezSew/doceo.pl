<?php

namespace App\Http\Controllers;

use App\Quiz;
use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class QuizesController extends Controller
{
    public function show(Quiz $quiz)
    {
        return $quiz;
    }

    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json('User not found', 403);
        } catch (TokenExpiredException $e) {
            return response()->json('User not found', 403);
        } catch (TokenInvalidException $e) {
            return response()->json('User not found', 403);
        }

        $user_id = strval($user->id);

        $this->validate($request, [
            'title' => 'string',
            'type' => 'string',
            'questions' => 'string',
        ]);

        $request->merge(['authorId' => $user_id]);


        $quiz = Quiz::create($request->all());
        return response()->json($quiz, 201);
    }

    public function getBestQuizes() {
        $quizes = Quiz::orderBy('rating', 'DESC')->get();
        $parsedQuizes = [];

        if(count($quizes) == 0) {
            $quizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        } else {
            for($i = 0; $i < count($quizes); $i++) {
                $quiz = $quizes[$i];
                $userId = $quiz['authorId'];
                $user = User::where('id', $userId)->get();
                $quiz['authorName'] = $user[0]['name'];
                array_push($parsedQuizes, $quiz);
            }
        }

        return response()->json($parsedQuizes, 201);
    }

    public function getUserQuizes(Request $request) {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json('User not found', 403);
        } catch (TokenExpiredException $e) {
            return response()->json('User not found', 403);
        } catch (TokenInvalidException $e) {
            return response()->json('User not found', 403);
        }

        $this->validate($request, [
            'userId' => 'int'
        ]);

        $request_user_id = $request->input('userId');
        $user_id = strval($user->id);

        $response = [$user_id, $request_user_id];

        if($request_user_id == $user_id) {
            $response = Quiz::where('authorId', $user_id)->get();
        }

        return response()->json($response, 201);
    }
}

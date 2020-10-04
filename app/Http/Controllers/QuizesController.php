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

    public function getBestQuizes(Request $request) {
        $req_filter = $request->input('filter');
        $req_quizes_per_page = (int)$request->input('perPage');

        if($req_quizes_per_page < 5) {
            $quizes_per_page = 5;
        } elseif($req_quizes_per_page > 30) {
            $quizes_per_page = 30;
        } else {
            $quizes_per_page = $req_quizes_per_page;
        }

        $this->validate($request, [
            'filter' => 'string'
        ]);

        // filter
        if($req_filter == 'rating') {
            $quizes = Quiz::orderBy('rating', 'DESC')->paginate($quizes_per_page);
        } else {
            $quizes = Quiz::orderBy('rating', 'ASC')->paginate($quizes_per_page);
        }

        // pagination
        $records = $quizes;
        $response = [$records->lastPage()];

        $parsedQuizes = [];
        if(count($records) == 0) {
            $parsedQuizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        } else {
            for($i = 0; $i < count($quizes); $i++) {
                $quiz = $records[$i];
                $userId = $quiz['authorId'];
                $user = User::where('id', $userId)->get();
                $quiz['authorName'] = $user[0]['name'];
                array_push($parsedQuizes, $quiz);
            }
        }

        array_push($response, $parsedQuizes);
        return response()->json($response, 201);
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

        $quizes = [];

        if($request_user_id == $user_id) {
            $quizes = Quiz::where('authorId', $user_id)->get();
        }

        if(count($quizes) == 0) {
            $quizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        }

        return response()->json($quizes, 201);
    }

    // get all quizes finished by user
    public function getUserFinishedQuizes(Request $request) {
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

        $finished_quizes = [];

        if($request_user_id == $user_id) {
            $finished_quizes_obj = User::where('id', $user_id)->get('finished_quizes')[0];
            $finished_quizes_raw = $finished_quizes_obj['finished_quizes'];
            $finished_quizes_ids_array = json_decode(urldecode($finished_quizes_raw));
            $index = 0;

            foreach ($finished_quizes_ids_array as $quiz_id) {
                $quiz = Quiz::where('id', $quiz_id)->get();
                array_push($finished_quizes, $quiz[0]);
                $index++;
            }
        }

        if(count($finished_quizes) == 0) {
            $finished_quizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        }

        return response()->json($finished_quizes, 201);
    }

    public function deleteQuiz(Request $request) {
        $request_test_id = $request->input('testId');
        $quiz = Quiz::find((int)$request_test_id);

        if($quiz) {
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
            $author_id = $quiz['authorId'];

            if($user_id == $author_id) {
                $quiz->delete();
                $response = Quiz::where('authorId', $user_id)->get();
            } else {
                $response = 'You cannot perform this action from this account.';
            }
        } else {
            $response = 'Quiz not found.';
        }

        return response()->json($response, 201);
    }
}

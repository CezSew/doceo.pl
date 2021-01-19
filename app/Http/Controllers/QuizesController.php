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

    /*
     * Get quizes paginated list based on rating order
     */
    public function getQuizes(Request $request) {
        $this->validate($request, [
            'filter' => 'string',
            'userId' => 'string',
            'perPage' => 'int'
        ]);

        $req_filter = $request->input('filter');
        $active_user_id = $request->input('userId');
        $req_quizes_per_page = (int)$request->input('perPage');

        // set min and max items per page
        if($req_quizes_per_page < 5) {
            $quizes_per_page = 5;
        } elseif($req_quizes_per_page > 30) {
            $quizes_per_page = 30;
        } else {
            $quizes_per_page = $req_quizes_per_page;
        }

        // filter
        if($req_filter == 'rating') {
            $quizes = Quiz::orderBy('rating', 'DESC')->paginate($quizes_per_page);
        } else {
            $quizes = Quiz::orderBy('rating', 'ASC')->paginate($quizes_per_page);
        }

        $records = $quizes;
        $response = [$records->lastPage()];
        $parsedQuizes = [];

        if(count($records) == 0) {
            // handle lack of items
            $parsedQuizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        } else {
            for($i = 0; $i < count($quizes); $i++) {
                $quiz = $records[$i];

                // get name of author based on author ID
                $userId = $quiz['authorId'];
                $user = User::where('id', $userId)->get();
                $quiz['authorName'] = $user[0]['name'];

                // get current user stats
                $quiz['userScore'] = '-';

                if($active_user_id != 'none') {
                    $active_user = User::where('id', (int)$active_user_id)->get();
                    $user_finished_quizes_encoded = $active_user[0]['finished_quizes'];

                    if(!empty($user_finished_quizes_encoded)) {
                        $user_finished_quizes_decoded = json_decode(urldecode($user_finished_quizes_encoded));

                        foreach ($user_finished_quizes_decoded as $key=>$value) {
                            $finished_quiz = $user_finished_quizes_decoded[$key];
                            $finished_quiz_id = $finished_quiz[0];
                            $finished_quiz_score = $finished_quiz[1];

                            if((int)$finished_quiz_id == (int)$quiz['id']) {
                                $quiz['userScore'] = (string)$finished_quiz_score;
                            }
                        }
                    }
                }

                unset($quiz['questions']); // we don't want to send questions

                array_push($parsedQuizes, $quiz);
            }
        }

        array_push($response, $parsedQuizes);
        return response()->json($response, 201);
    }

    public function getQuizByID(Request$request) {
        $this->validate($request, [
            'quizId' => 'string'
        ]);

        $quiz_id =  $request->input('quizId');

        $quiz = Quiz::where('id', $quiz_id)->get();

        return response()->json($quiz, 201);
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

            $debug = [];

            foreach ($finished_quizes_ids_array as $quiz_data) {
                $quiz_id = $quiz_data[0];
                $quiz = Quiz::where('id', $quiz_id)->get();
                $quiz[0]['userScore'] = '-';

                // get current user stats
                foreach ($finished_quizes_ids_array as $key=>$value) {
                    $finished_quiz = $finished_quizes_ids_array[$key];
                    $finished_quiz_id = $finished_quiz[0];
                    $finished_quiz_score = $finished_quiz[1];

                    array_push($debug, [(int)$finished_quiz_id, (int)$quiz_id]);

                    if((int)$finished_quiz_id == (int)$quiz_id) {
                        $quiz[0]['userScore'] = (string)$finished_quiz_score;
                    }
                }

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

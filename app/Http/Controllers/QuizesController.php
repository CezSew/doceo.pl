<?php

namespace App\Http\Controllers;

use App\Quiz;
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

        if(count($quizes) == 0) {
            $quizes['msg'] = 'Nie znaleziono żadnych quizów. Dodaj quiz i spróbuj ponownie.';
        }

        return response()->json($quizes, 201);
    }
}

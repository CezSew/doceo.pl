<?php

namespace App\Http\Controllers;

use App\QuizResult;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class QuizesResultsController extends Controller
{
    public function show(QuizResult $quiz)
    {
        return $quiz;
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'userId' => 'string',
            'quizId' => 'string'
        ]);

        $quiz_result = QuizResult::create($request->all());

        return response()->json($quiz_result, 201);
    }

}

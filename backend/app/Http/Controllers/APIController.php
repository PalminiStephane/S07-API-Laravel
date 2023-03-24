<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class APIController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return $tasks;
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);

        return $task;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|between:2,255',
        ]);

        $task = new Task();
        $task->title = $validated['title'];
        $task->save();

        return $task;
    }

    public function update($id, Request $request)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|between:2,255',
        ]);

        $task->title = $validated['title'];
        $task->save();

        return $task;
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);

        $task->delete();
    }
}

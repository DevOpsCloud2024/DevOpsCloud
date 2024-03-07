<?php

use App\Http\Controllers\LabelController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Post;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/filter', function () {
    return Inertia::render('Filter', [
        'posts' => Post::with('user:id,name')->latest()->get(),
        'types' => DB::table('types')->get(),
        'labels' => DB::table('labels')->get(),
        'label_post' => DB::table('label_post')->get(),
        'post_type' => DB::table('post_type')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('filter');


Route::resource('types', TypeController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);


Route::resource('labels', LabelController::class)
->only(['store'])
->middleware(['auth', 'verified']);

Route::resource('posts', PostController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TypeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

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
Route::get('/filter', function () {
    return Inertia::render('Filter', [
        'filtered_posts' => [],
        'types' => DB::table('types')->get(),
        'labels' => DB::table('labels')->get(),
        'courses' => DB::table('courses')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('filter');

Route::resource('types', TypeController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('labels', LabelController::class)
    ->only(['store'])
    ->middleware(['auth', 'verified']);

Route::get('filtering', [PostController::class, 'filtering'])
    ->name('post.filtering')
    ->middleware(['auth', 'verified']);

Route::resource('posts', PostController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('/', [PostController::class, 'index'])->middleware('auth');

Route::resource('courses', CourseController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::post('enroll/{course}', [CourseController::class, 'enroll'])
    ->name('course.enroll')
    ->middleware(['auth', 'verified']);

Route::post('rate/{post}/{rating}', [PostController::class, 'rate'])
    ->name('post.rate')
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

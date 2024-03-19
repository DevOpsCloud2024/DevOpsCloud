<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use willvincent\Rateable\Rateable;

class Post extends Model
{
    use HasFactory, Rateable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'filepath',
        'course_id',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['user_average_rating', 'average_rating', 'times_rated'];

    /**
     * Get the user that owns the post.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the types that the post belongs to.
     */
    public function types()
    {
        return $this->belongsToMany(Type::class);
    }

    /**
     * The labels that belong to the post.
     */
    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }

    /**
     * The course that a post belongs to.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /** This function is necessary for the ratings.
     * It is missing from the ratings package for unknown reasons,
     * so we include it here.
     */
    public function getTimesRatedAttribute()
    {
        return $this->timesRated();

    }
}

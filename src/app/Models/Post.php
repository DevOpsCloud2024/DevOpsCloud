<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    public function rating()
    {
        return $this->hasMany(Rating::class);
    }

    // public function averageRating()
    // {
    //     return $this->averageRating();
    // }

    // For some reason not in package
    public function getTimesRatedAttribute(){
        return $this->timesRated();
    }
}

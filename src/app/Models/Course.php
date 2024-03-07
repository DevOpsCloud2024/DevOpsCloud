<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{
    use HasFactory;

    /**
     * Get the users that are enrolled in the course.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'courses_users', 'course_id', 'user_id');
    }
}

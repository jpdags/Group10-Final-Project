<?php

namespace App\Policies;

use App\Models\User;
use App\Models\TravelDiary;

class TravelDiaryPolicy
{
    /**
     * Determine if the user can view the travel diary
     */
    public function view(User $user, TravelDiary $travelDiary): bool
    {
        return $user->id === $travelDiary->user_id;
    }

    /**
     * Determine if the user can update the travel diary
     */
    public function update(User $user, TravelDiary $travelDiary): bool
    {
        return $user->id === $travelDiary->user_id;
    }

    /**
     * Determine if the user can delete the travel diary
     */
    public function delete(User $user, TravelDiary $travelDiary): bool
    {
        return $user->id === $travelDiary->user_id;
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Constants\UserType;
use App\Repositories\CompaniesRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
        'deleted_at',
        'activation_code',
        'reset_code',
        'social_provider',
        'social_provider_id',
    ];

    protected $appends = [
        'avatar_path'
    ];

    public function getAvatarPathAttribute()
    {
        if (!empty($this->avatar)) {
            return asset('storage/uploads/'.$this->avatar);
        }
        return null;
    }

    /**
     * @param User $userInfo
     * @return array
     */
    public static function parseData(User $userInfo): array
    {
        return [
            'id' => $userInfo['id'],
            'full_name' => $userInfo['first_name'].' '.$userInfo['last_name'],
            'first_name' => $userInfo['first_name'],
            'last_name' => $userInfo['last_name'],
            'email' => $userInfo['email'],
            'user_type' => $userInfo['user_type'],
            'phone' => $userInfo['phone'],
            'gender' => $userInfo['gender'],
            'avatar_path' => $userInfo['avatar_path']
        ];
    }
}

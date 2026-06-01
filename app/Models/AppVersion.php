<?php

namespace App\Models;

use Database\Factories\AppVersionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'version',
    'version_code',
    'platform',
    'release_type',
    'release_notes',
    'is_force_update',
    'is_active',
    'released_at',
    'download_url',
    'checksum',
    'file_size_bytes',
    'metadata',
])]
#[Hidden([])]
class AppVersion extends Model
{
    /** @use HasFactory<AppVersionFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'released_at' => 'datetime',
            'is_force_update' => 'boolean',
            'is_active' => 'boolean',
            'metadata' => 'array',
        ];
    }

    /**
     * Scope a query to only include active versions.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include force update versions.
     */
    public function scopeForceUpdate($query)
    {
        return $query->where('is_force_update', true);
    }

    /**
     * Scope a query to filter by platform.
     */
    public function scopeByPlatform($query, $platform)
    {
        return $query->where('platform', $platform);
    }

    /**
     * Get the latest active version for a platform.
     */
    public function scopeLatestForPlatform($query, $platform)
    {
        return $query->where('platform', $platform)
            ->where('is_active', true)
            ->orderBy('released_at', 'desc')
            ->first();
    }
}

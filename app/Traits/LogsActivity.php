<?php

namespace App\Traits;

use App\Models\AdminActivityLog;

trait LogsActivity
{
    /**
     * Log an admin activity.
     */
    protected function logActivity(
        string $action,
        string $module,
        string $description,
        $subject = null
    ): void {
        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'module' => $module,
            'description' => $description,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject ? $subject->id : null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}

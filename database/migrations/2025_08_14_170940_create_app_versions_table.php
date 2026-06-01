<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_versions', function (Blueprint $table) {
            $table->id();
            $table->string('version');
            $table->string('version_code');
            $table->enum('platform', ['web', 'android', 'ios', 'desktop'])->default('web');
            $table->enum('release_type', ['major', 'minor', 'patch', 'hotfix'])->default('patch');
            $table->text('release_notes')->nullable();
            $table->boolean('is_force_update')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('released_at');
            $table->string('download_url')->nullable();
            $table->string('checksum')->nullable();
            $table->integer('file_size_bytes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['version', 'platform']);
            $table->index(['platform', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_versions');
    }
};

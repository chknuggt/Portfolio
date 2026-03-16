<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\PortfolioSeeder::class);
    }

    public function test_settings_returns_all_keys(): void
    {
        $response = $this->getJson('/api/settings');

        $response->assertOk();
        $response->assertJsonStructure([
            'name', 'title', 'email', 'phone', 'location',
            'github', 'github_username', 'username',
            'linkedin', 'chess_link', 'resume_filename',
            'siri_bio', 'music_title', 'music_artist',
        ]);
        $response->assertJsonFragment(['name' => 'Marios Eleftheriou']);
    }

    public function test_content_projects_returns_six(): void
    {
        $response = $this->getJson('/api/content/project');

        $response->assertOk();
        $response->assertJsonCount(6);
        $response->assertJsonFragment(['slug' => 'portfolio']);
        $response->assertJsonFragment(['slug' => 'waterfilter']);
    }

    public function test_content_pages_returns_three(): void
    {
        $response = $this->getJson('/api/content/page');

        $response->assertOk();
        $response->assertJsonCount(3);
    }

    public function test_content_terminal_returns_four(): void
    {
        $response = $this->getJson('/api/content/terminal');

        $response->assertOk();
        $response->assertJsonCount(4);
    }

    public function test_content_links_returns_five(): void
    {
        $response = $this->getJson('/api/content/link');

        $response->assertOk();
        $response->assertJsonCount(5);
    }

    public function test_content_slug_returns_correct_item(): void
    {
        $response = $this->getJson('/api/content/slug/about-me');

        $response->assertOk();
        $response->assertJsonFragment([
            'slug' => 'about-me',
            'title' => 'About Me',
            'type' => 'page',
        ]);
    }

    public function test_content_slug_not_found_returns_404(): void
    {
        $response = $this->getJson('/api/content/slug/nonexistent');

        $response->assertNotFound();
        $response->assertJsonFragment(['error' => 'Not found']);
    }

    public function test_content_unknown_type_returns_empty(): void
    {
        $response = $this->getJson('/api/content/faketype');

        $response->assertOk();
        $response->assertJsonCount(0);
    }
}

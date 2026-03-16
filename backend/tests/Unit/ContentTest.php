<?php

namespace Tests\Unit;

use App\Models\Content;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\PortfolioSeeder::class);
    }

    public function test_filter_by_type_returns_correct_count(): void
    {
        $this->assertCount(6, Content::where('type', 'project')->get());
        $this->assertCount(3, Content::where('type', 'page')->get());
        $this->assertCount(4, Content::where('type', 'terminal')->get());
        $this->assertCount(5, Content::where('type', 'link')->get());
    }

    public function test_slug_lookup_returns_correct_item(): void
    {
        $content = Content::where('slug', 'portfolio')->first();

        $this->assertNotNull($content);
        $this->assertEquals('macOS Portfolio', $content->title);
        $this->assertEquals('project', $content->type);
    }

    public function test_slug_lookup_returns_null_for_missing(): void
    {
        $content = Content::where('slug', 'nonexistent')->first();

        $this->assertNull($content);
    }
}

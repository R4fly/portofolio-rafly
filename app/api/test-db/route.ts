import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test query ke live_stats
    const { data: stats, error } = await supabase
      .from('live_stats')
      .select('*')
      .order('metric_key');
    
    if (error) throw error;
    
    // Test query ke projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(3);
    
    if (projectsError) throw projectsError;
    
    return NextResponse.json({
      success: true,
      stats,
      projects,
      message: 'Database connection successful!',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
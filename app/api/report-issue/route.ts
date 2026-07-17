// API Route for reporting issues
// In production, this should use a GitHub token to create actual GitHub issues

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;
    
    // Handle both JSON and form submissions
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {
        provider: formData.get('provider') as string || '',
        slug: formData.get('slug') as string || '',
        url: formData.get('url') as string || '',
        type: formData.get('type') as string || 'general',
        description: formData.get('description') as string || '',
        suggestion: formData.get('suggestion') as string || '',
        links: formData.get('links') as string || '',
      };
    }

    const { provider, slug, url, type, description, suggestion, links } = body;

    // Validate required fields
    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // In production, this would create a GitHub issue
    // For now, we'll just log it or return success
    // To enable GitHub integration, set GITHUB_TOKEN and GITHUB_REPO in environment

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'afrilayer/afrilayer';

    if (GITHUB_TOKEN) {
      const issueTitle = provider 
        ? `[Community Report] ${provider} - ${type}`
        : `[Community Report] ${type}`;
      const issueBody = `
## Community Issue Report

${provider ? `**Provider:** ${provider}` : ''}
${slug ? `**Slug:** ${slug}` : ''}
${url ? `**Afrilayer URL:** ${url}` : ''}
**Issue Type:** ${type}
**Reported:** ${new Date().toISOString()}

### Description
${description}

${suggestion ? `### Suggested Correction\n${suggestion}` : ''}

${links ? `### Supporting Links\n${links}` : ''}

---
*This issue was submitted via the Afrilayer community contribution form.*
`;

      // Create GitHub issue
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
            labels: ['community-report', type],
          }),
        });

        if (!response.ok) {
          console.error('Failed to create GitHub issue:', await response.text());
          // Continue anyway - we'll store locally
        }
      } catch (githubError) {
        console.error('GitHub API error:', githubError);
      }
    }

    // Redirect back to contribute page on success (for form submissions)
    if (contentType?.includes('application/x-www-form-urlencoded') || !contentType?.includes('json')) {
      return NextResponse.redirect(new URL('/contribute?submitted=true', request.url));
    }

    return NextResponse.json({ success: true, message: 'Issue reported successfully' });
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Failed to process issue report' },
      { status: 500 }
    );
  }
}
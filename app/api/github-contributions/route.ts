import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const token = process.env.GITHUB_TOKEN?.trim();
  const username = process.env.GITHUB_USERNAME?.trim();

  if (!token || !username) {
    return NextResponse.json(
      {
        configured: false,
        message: "GITHUB_TOKEN or GITHUB_USERNAME is not set in environment variables.",
      },
      { status: 200 }
    );
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
                contributionLevel
                weekday
              }
            }
            months {
              name
              year
              firstDay
              totalWeeks
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-NextJS-App",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          configured: true,
          error: `GitHub API error: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      return NextResponse.json(
        {
          configured: true,
          error: json.errors[0]?.message || "GraphQL query error",
        },
        { status: 400 }
      );
    }

    const userData = json.data?.user;
    if (!userData) {
      return NextResponse.json(
        {
          configured: true,
          error: `User "${username}" not found on GitHub.`,
        },
        { status: 404 }
      );
    }

    const calendar = userData.contributionsCollection?.contributionCalendar;

    return NextResponse.json({
      configured: true,
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatarUrl,
      totalContributions: calendar?.totalContributions || 0,
      weeks: calendar?.weeks || [],
      months: calendar?.months || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        configured: true,
        error: error.message || "Failed to fetch GitHub contributions data.",
      },
      { status: 500 }
    );
  }
}

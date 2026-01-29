import yaml from 'js-yaml';

export const mockCodeContent = [
  {
    type: 'user',
    content: 'Generate a comprehensive set of code examples in various languages with collapsible blocks.',
    timestamp: '2026-01-29 12:15:00 +00:00'
  },
  {
    type: 'ai',
    content: `
      <h3>Code Examples</h3>
      <p>Here are code snippets in different languages as requested:</p>
      
      <div class="code-blocks-container">
        
        <!-- Python -->
        <details class="code-block-wrapper" open>
            <summary>
                <span class="lang-icon">🐍</span>
                <span class="lang-name">Python (Data Analysis)</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-python">import pandas as pd
import numpy as np

def analyze_data(file_path):
    try:
        df = pd.read_csv(file_path)
        summary = df.describe()
        missing_values = df.isnull().sum()
        
        print("Data Summary:")
        print(summary)
        return summary
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

# Usage
analyze_data('data.csv')</code></pre>
            </div>
        </details>

        <!-- JavaScript -->
        <details class="code-block-wrapper">
            <summary>
                <span class="lang-icon">📜</span>
                <span class="lang-name">JavaScript (React Component)</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-jsx">import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(\`/api/users/\${userId}\`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="profile-card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};

export default UserProfile;</code></pre>
            </div>
        </details>

        <!-- Rust -->
        <details class="code-block-wrapper">
            <summary>
                <span class="lang-icon">🦀</span>
                <span class="lang-name">Rust (Async Main)</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-rust">use tokio::fs::File;
use tokio::io::{self, AsyncReadExt};

#[tokio::main]
async fn main() -> io::Result<()> {
    let mut file = File::open("hello.txt").await?;
    let mut contents = vec![];
    file.read_to_end(&mut contents).await?;

    println!("File contents: {:?}", String::from_utf8_lossy(&contents));
    Ok(())
}</code></pre>
            </div>
        </details>

        <!-- Go -->
        <details class="code-block-wrapper">
            <summary>
                <span class="lang-icon">🐹</span>
                <span class="lang-name">Go (HTTP Server)</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-go">package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.NotFound(w, r)
        return
    }
    fmt.Fprintf(w, "Hello, Gophers!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    fmt.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        panic(err)
    }
}</code></pre>
            </div>
        </details>

      </div>
    `,
    timestamp: '2026-01-29 12:15:05 +00:00'
  }
];

export const mockContent = [
  {
    type: 'user',
    content: 'Show me an example of a complex task output and some multimedia content.',
    timestamp: '2026-01-29 11:45:00 +00:00'
  },
  {
    type: 'ai',
    content: `
      <h3>Multimedia Examples</h3>
      <p>Here are the requested assets:</p>
      
      <div class="media-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 10px 0;">
        <img src="https://picsum.photos/400/300" alt="Random Image" style="width:100%; border-radius: 8px;">
        <div class="file-card" style="background:#333; padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px;">
           <span class="material-icons-outlined">description</span>
           <span>Project_Specs.pdf</span>
        </div>
      </div>

      <h4>Video Example (YouTube)</h4>
      <div class="video-container" style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius: 8px; margin: 10px 0;">
        <iframe style="position:absolute; top:0; left:0; width:100%; height:100%;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
      </div>

      <h3>Code Examples</h3>
      <div class="code-blocks-container">
        <details class="code-block-wrapper" open>
            <summary>
                <span class="lang-icon">🐍</span>
                <span class="lang-name">Python</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-python">def hello_world():
    print("Hello, Friday!")
    return True</code></pre>
            </div>
        </details>

        <details class="code-block-wrapper">
            <summary>
                <span class="lang-icon">📜</span>
                <span class="lang-name">JavaScript</span>
                <span class="code-actions">
                    <button class="copy-code-btn" title="Copy code"><span class="material-icons-outlined">content_copy</span></button>
                    <span class="chevron material-icons-outlined">expand_more</span>
                </span>
            </summary>
            <div class="code-content">
<pre><code class="language-javascript">const friday = {
  version: "2.0.0",
  active: true
};
console.log(friday);</code></pre>
            </div>
        </details>
      </div>

      <h3>Task Output</h3>
      <div class="task-output" style="border: 1px solid #333; border-radius: 8px; overflow: hidden; margin: 10px 0;">
        <details>
           <summary style="background:#222; padding:10px; cursor:pointer; display:flex; align-items:center; gap:8px;">
             <span class="material-icons-outlined" style="color:green;">check_circle</span>
             <span>Refactoring Database Schema</span>
           </summary>
           <div style="padding:10px; background:#1a1a1a;">
             <p>✓ Analyzed existing schema</p>
             <p>✓ Created migration script</p>
             <p>✓ Verified data integrity</p>
           </div>
        </details>
        <details>
           <summary style="background:#222; padding:10px; cursor:pointer; display:flex; align-items:center; gap:8px;">
             <span class="material-icons-outlined" style="color:red;">cancel</span>
             <span>Deploying to Staging</span>
           </summary>
           <div style="padding:10px; background:#1a1a1a;">
             <p>✗ Connection to server failed</p>
             <p>⚠ Retrying in 5 seconds...</p>
           </div>
        </details>
      </div>

      <h3>Formatted Text</h3>
      <p>Here is a list of items:</p>
      <ul>
        <li>Item 1: <strong>Bold text</strong></li>
        <li>Item 2: <em>Italic text</em></li>
        <li>Item 3: Dates: 2026-05-12</li>
      </ul>
      <p>Special characters: &copy; &euro; &trade; &uarr; &darr;</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    `,
    timestamp: '2026-01-29 11:45:05 +00:00'
  },
  {
    type: 'ai',
    content: "<h3>Suggested follow-ups</h3><p>Would you like to analyze the error logs?</p>",
    isSuggestion: true
  }
];

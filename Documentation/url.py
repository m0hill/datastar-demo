import re
import sys
from pathlib import Path

def extract_links_from_markdown(file_path):
    """
    Extract all unique links from a markdown file.

    Args:
        file_path (str): Path to the markdown file

    Returns:
        set: Set of unique links found in the file
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return set()
    except Exception as e:
        print(f"Error reading file: {e}")
        return set()

    # Regular expressions for different markdown link formats
    patterns = [
        # Standard markdown links: [text](url)
        r'\[([^\]]*)\]\(([^)]+)\)',
        # Reference-style links: [text][ref] and [ref]: url
        r'\[([^\]]*)\]:\s*([^\s]+)',
        # Bare URLs (http/https)
        r'(?<![\(\[])(https?://[^\s\)]+)(?![\)\]])',
        # Autolinks: <url>
        r'<(https?://[^>]+)>'
    ]

    links = set()

    for pattern in patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            # Handle different match formats
            if isinstance(match, tuple):
                # For patterns that capture groups, get the URL part
                if len(match) == 2:
                    # Standard links [text](url) or reference links [ref]: url
                    url = match[1].strip()
                else:
                    url = match[0].strip()
            else:
                # Single match (bare URLs)
                url = match.strip()

            # Clean up the URL (remove trailing punctuation that might be captured)
            url = re.sub(r'[.,;:!?]+$', '', url)

            # Only add if it looks like a valid URL
            if url and (url.startswith('http') or url.startswith('www') or url.startswith('/')):
                links.add(url)

    return links

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <markdown_file_path>")
        sys.exit(1)

    file_path = sys.argv[1]

    # Check if file exists
    if not Path(file_path).exists():
        print(f"Error: File '{file_path}' does not exist.")
        sys.exit(1)

    # Extract links
    unique_links = extract_links_from_markdown(file_path)

    # Display results
    if unique_links:
        print(f"Found {len(unique_links)} unique links in '{file_path}':")
        print("-" * 50)
        for link in sorted(unique_links):
            print(link)
    else:
        print(f"No links found in '{file_path}'.")

if __name__ == "__main__":
    main()
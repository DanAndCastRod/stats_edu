import os
import json

CONTENT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "content", "courses")

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

def write_course_meta(slug, title, code, description):
    course_dir = os.path.join(CONTENT_DIR, slug)
    ensure_dir(course_dir)
    meta_path = os.path.join(course_dir, "metadata.json")
    write_json(meta_path, {
        "title": title,
        "code": code,
        "description": description,
        "slug": slug,
        "isMock": False
    })
    return course_dir

def write_module_meta(course_dir, mod_slug, title, order):
    mod_dir = os.path.join(course_dir, mod_slug)
    ensure_dir(mod_dir)
    meta_path = os.path.join(mod_dir, "metadata.json")
    write_json(meta_path, {
        "title": title,
        "order": order
    })
    return mod_dir

def write_lesson(mod_dir, filename, title, order, description, bloom_level, est_minutes, quiz_frontmatter, content_body, quiz_component=None):
    lesson_path = os.path.join(mod_dir, filename)
    
    # Build YAML frontmatter
    fm_lines = [
        "---",
        f'title: "{title}"',
        f'order: {order}',
        f'description: "{description}"',
        f'bloomLevel: "{bloom_level}"',
        f'estimatedMinutes: {est_minutes}',
        "quiz:"
    ]
    
    for q in quiz_frontmatter:
        fm_lines.append(f'  - question: "{q["question"]}"')
        fm_lines.append("    options:")
        for opt in q["options"]:
            fm_lines.append(f'      - "{opt}"')
        fm_lines.append(f'    answer: {q["answer"]}')
        fm_lines.append(f'    explanation: "{q["explanation"]}"')
    
    fm_lines.append("---")
    fm_text = "\n".join(fm_lines)
    
    full_content = f"{fm_text}\n\n{content_body.strip()}\n"
    if quiz_component:
        full_content += f"\n---\n\n# Autoevaluación Formativa\n\n{quiz_component.strip()}\n"
        
    with open(lesson_path, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"  ✓ Created lesson: {filename}")

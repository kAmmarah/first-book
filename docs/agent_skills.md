# AI Agent Skills Documentation

This document describes the reusable AI agent skills implemented for the AI Interactive Book platform.

## Overview

The platform implements seven reusable AI agent skills that can be composed to create more complex functionalities. Each skill is defined with a clear input/output schema and implementation guidelines.

## Skill Catalog

### 1. Summarizer
**Purpose**: Creates concise summaries of educational content

**Input**:
- `content` (string): The content to summarize
- `length` (enum: short, medium, long): Desired summary length

**Output**:
- `summary` (string): The summarized content

**Use Cases**:
- Chapter summaries
- Section overviews
- Quick review materials

### 2. Explainer
**Purpose**: Simplifies complex concepts for different audience levels

**Input**:
- `concept` (string): The concept to explain
- `audience_level` (enum: beginner, intermediate, advanced): Target audience experience level

**Output**:
- `explanation` (string): The simplified explanation

**Use Cases**:
- Glossary definitions
- Concept clarifications
- Supplementary explanations

### 3. Code Generator
**Purpose**: Creates programming examples for technical concepts

**Input**:
- `concept` (string): The programming concept to demonstrate
- `language` (string): Programming language for the example
- `complexity` (enum: basic, intermediate, advanced): Complexity level

**Output**:
- `code_example` (string): Generated code example with comments

**Use Cases**:
- Programming tutorials
- Code snippets
- Hands-on exercises

### 4. Difficulty Adjuster
**Purpose**: Adapts content difficulty based on user profile

**Input**:
- `content` (string): The content to adjust
- `software_experience` (enum: beginner, intermediate, advanced): User's software experience
- `hardware_experience` (enum: beginner, intermediate, advanced): User's hardware experience
- `learning_style` (enum: visual, auditory, kinesthetic, reading/writing): User's learning style

**Output**:
- `adjusted_content` (string): Content adapted to user's profile

**Use Cases**:
- Personalized chapter content
- Adaptive learning paths
- Customized explanations

### 5. Translator
**Purpose**: Translates content between languages

**Input**:
- `text` (string): Text to translate
- `source_language` (string): Source language code (optional)
- `target_language` (string): Target language code

**Output**:
- `translated_text` (string): Translated text

**Use Cases**:
- Multilingual content delivery
- Language learning support
- Accessibility features

### 6. Quiz Generator
**Purpose**: Creates assessments based on content

**Input**:
- `content` (string): Content to create quiz from
- `question_count` (integer): Number of questions to generate
- `question_types` (array): Types of questions (multiple_choice, true_false, short_answer)

**Output**:
- `quiz` (array): Array of question objects with choices, correct answers, and explanations

**Use Cases**:
- Chapter quizzes
- Knowledge checks
- Self-assessment tools

### 7. Example Generator
**Purpose**: Creates practical examples to illustrate abstract concepts

**Input**:
- `concept` (string): Concept to illustrate
- `domain` (string): Domain or field of the concept
- `count` (integer): Number of examples to generate

**Output**:
- `examples` (array): Array of example objects with title, description, and application

**Use Cases**:
- Practical illustrations
- Real-world applications
- Case studies

## Composition Patterns

These skills can be composed in various ways:

1. **Personalized Learning Path**: Difficulty Adjuster → Explainer → Quiz Generator
2. **Multilingual Content**: Translator → Summarizer
3. **Technical Tutorial**: Code Generator → Example Generator → Quiz Generator
4. **Content Review**: Summarizer → Quiz Generator

## Implementation Notes

Each skill is implemented as a YAML configuration file that defines:
- Input/output schemas using JSON Schema
- System prompts for the AI model
- User prompt templates with variable interpolation
- Clear documentation of purpose and usage

Skills can be invoked individually or composed into workflows using the Book Assistant subagent.
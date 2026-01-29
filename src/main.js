import './style.css';
import { loadConfig, applyTheme } from './config.js';
import { mockContent, mockCodeContent } from './content.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

hljs.configure({
    ignoreUnescapedHTML: true
});

// Elements
const app = {
    sidebar: document.getElementById('sidebar'),
    toggleSidebar: document.getElementById('toggle-sidebar'),
    fillBtn: document.getElementById('fill-btn'),
    chatContent: document.getElementById('chat-content'),
    messagesContainer: document.getElementById('messages-container'),
    suggestedFollowups: document.getElementById('suggested-followups'),
    promptContainer: document.getElementById('prompt-container'),
    userPrompt: document.getElementById('user-prompt'),
    scrollUp: document.getElementById('scroll-up'),
    scrollDown: document.getElementById('scroll-down'),
    filesBtn: document.getElementById('files-btn'),
    filesModal: document.getElementById('files-modal'),
    closeModal: document.getElementById('close-modal'),
    sendBtn: document.getElementById('send-btn')
};

function initCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const label = trigger.querySelector('.selected-value');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close others
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();

                // Handle FILL logic specifically
                if (dropdown.id === 'fill-dropdown-custom') {
                    const value = item.dataset.value;
                    fillContent(value);
                    dropdown.classList.remove('open');
                    return; // Don't update label for action dropdowns
                }

                // Update UI for selectable dropdowns
                items.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                label.textContent = item.textContent;
                dropdown.classList.remove('open');
            });
        });
    });

    // Close on click outside
    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('open'));
    });
}

// Initialize
async function init() {
    const config = await loadConfig();
    if (config) {
        applyTheme(config);
        document.title = `${config.app.name} ${config.app.version}`;
    }

    app.toggleSidebar.addEventListener('click', () => {
        app.sidebar.classList.toggle('collapsed');
    });

    // Remove old FILL listener, now handled in initCustomDropdowns
    initCustomDropdowns();


    app.userPrompt.addEventListener('input', handlePromptInput);
    app.userPrompt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    app.scrollUp.addEventListener('click', () => {
        app.chatContent.scrollTo({ top: 0, behavior: 'smooth' });
    });

    app.scrollDown.addEventListener('click', () => {
        app.chatContent.scrollTo({ top: app.chatContent.scrollHeight, behavior: 'smooth' });
    });

    app.filesBtn.addEventListener('click', () => {
        app.filesModal.classList.remove('hidden');
        renderFiles();
    });

    app.closeModal.addEventListener('click', () => {
        app.filesModal.classList.add('hidden');
    });
}

function renderFiles() {
    const files = [
        { name: 'logo.png', type: 'image', size: '25KB' },
        { name: 'data.csv', type: 'csv', size: '1.2MB' },
        { name: 'script.py', type: 'code', size: '4KB' }
    ];

    const body = app.filesModal.querySelector('.modal-body');
    body.innerHTML = `
      <div style="margin-bottom:10px;">
        <input type="text" placeholder="Filter files..." style="background:#222; border:1px solid #444; color:#fff; padding:8px; border-radius:4px; width:100%;">
      </div>
      <div class="file-list" style="display:flex; flex-direction:column; gap:8px;">
        ${files.map(f => `
          <div class="file-item" style="display:flex; justify-content:space-between; align-items:center; background:#222; padding:10px; border-radius:4px;">
             <div style="display:flex; align-items:center; gap:10px;">
                <span class="material-icons-outlined">insert_drive_file</span>
                <span>${f.name}</span>
                <span style="color:#666; font-size:12px;">${f.size}</span>
             </div>
             <button class="icon-btn" title="More"><span class="material-icons-outlined">more_horiz</span></button>
          </div>
        `).join('')}
      </div>
    `;
}

function handlePromptInput() {
    const hasText = app.userPrompt.value.trim().length > 0;

    // Move prompt to bottom on first input
    if (app.promptContainer.classList.contains('centered') && hasText) {
        app.promptContainer.classList.remove('centered');
        app.chatContent.classList.remove('empty');
    }

    // Activate send button
    if (hasText) {
        app.sendBtn.classList.add('active');
    } else {
        app.sendBtn.classList.remove('active');
    }

    // Auto-resize textarea
    app.userPrompt.style.height = 'auto';
    app.userPrompt.style.height = app.userPrompt.scrollHeight + 'px';
}

function sendMessage() {
    const text = app.userPrompt.value.trim();
    if (!text) return;

    // Add user message
    addMessage({ type: 'user', content: text, timestamp: new Date().toISOString() });
    app.userPrompt.value = '';
    app.userPrompt.style.height = 'auto';

    // Simulate AI response (basic)
    setTimeout(() => {
        addMessage({
            type: 'ai',
            content: 'I am Friday. Use the FILL button to see my full capabilities.',
            timestamp: new Date().toISOString()
        });
    }, 500);
}

function fillContent(type) {
    app.promptContainer.classList.remove('centered');
    app.chatContent.classList.remove('empty');
    app.messagesContainer.innerHTML = ''; // Clear previous

    const contentToLoad = type === 'code' ? mockCodeContent : mockContent;

    contentToLoad.forEach(item => {
        if (item.isSuggestion) {
            app.suggestedFollowups.innerHTML = item.content;
            app.suggestedFollowups.classList.remove('hidden');
        } else {
            addMessage(item);
        }
    });

    // Show scroll controls
    app.scrollUp.classList.remove('hidden');
    app.scrollDown.classList.remove('hidden');

    // Initialize copy buttons for code blocks
    initCopyButtons();

    // Apply syntax highlighting to code blocks
    highlightCodeBlocks();
}

function highlightCodeBlocks() {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-code-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent triggering the details toggle

            // Find the code content in the parent details element
            const codeBlock = btn.closest('.code-block-wrapper');
            const codeElement = codeBlock.querySelector('code');

            if (codeElement) {
                try {
                    await navigator.clipboard.writeText(codeElement.textContent);

                    // Visual feedback
                    const icon = btn.querySelector('.material-icons-outlined');
                    const originalText = icon.textContent;
                    icon.textContent = 'check';
                    btn.classList.add('copied');

                    setTimeout(() => {
                        icon.textContent = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            }
        });
    });
}

function addMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message', msg.type);

    div.innerHTML = `
    <div class="message-content">
      ${msg.content}
    </div>
    <div class="timestamp">${msg.timestamp}</div>
  `;

    app.messagesContainer.appendChild(div);
    app.chatContent.scrollTop = app.chatContent.scrollHeight;
}

init();

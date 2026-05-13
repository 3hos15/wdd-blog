const STORAGE_PREFIX = 'meesterschap_vote_';


function getVoteState(postId) {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + postId);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return { count: 0, voted: null };
}


function saveVoteState(postId, state) {
  try {
    localStorage.setItem(STORAGE_PREFIX + postId, JSON.stringify(state));
  } catch (e) {}
}


function renderVote(postId, state) {
  const countEl = document.querySelector(`.vote-count[data-post="${postId}"]`);
  const upBtn   = document.querySelector(`.vote-btn.up[data-post="${postId}"]`);
  const downBtn = document.querySelector(`.vote-btn.down[data-post="${postId}"]`);

  if (!countEl) return;

  countEl.textContent = state.count;
  countEl.className = 'vote-count';
  if (state.count > 0) countEl.classList.add('positive');
  if (state.count < 0) countEl.classList.add('negative');

  upBtn?.classList.toggle('voted', state.voted === 'up');
  downBtn?.classList.toggle('voted', state.voted === 'down');
}


function handleVote(postId, direction) {
  const state = getVoteState(postId);

  if (state.voted === direction) {
    // Clicking same direction = undo vote
    state.count += direction === 'up' ? -1 : 1;
    state.voted = null;
  } else if (state.voted !== null) {
    // Switching direction: undo old, apply new
    state.count += direction === 'up' ? 2 : -2;
    state.voted = direction;
  } else {
    // New vote
    state.count += direction === 'up' ? 1 : -1;
    state.voted = direction;
  }

  saveVoteState(postId, state);
  renderVote(postId, state);
}


document.querySelectorAll('.vote-btn[data-post]').forEach(btn => {
  const postId    = btn.dataset.post;
  const direction = btn.dataset.dir;

  renderVote(postId, getVoteState(postId));

  btn.addEventListener('click', () => handleVote(postId, direction));
});

const postIds = new Set(
  Array.from(document.querySelectorAll('.vote-btn[data-post]'))
    .map(btn => btn.dataset.post)
);

postIds.forEach(id => renderVote(id, getVoteState(id)));
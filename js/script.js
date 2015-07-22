window.onload = init;

var chords = {
    A: ['C#m','F#m','Bm','E','A','D','G','G#dim'],
    B: ['D#m','G#m','C#m','F#','B','E','A','A#dim'],
    C: ['Em','Am','Dm','G','C','F','Bb','Bdim'],
    D: ['F#m','Bm','Em','A','D','G','C','C#dim'],
    E: ['G#m','C#m','F#m','B','E','A','D','D#dim'],
    F: ['Am','Dm','Gm','C','F','Bb','Eb','Edim'],
    Fs: ['A#m','D#m','G#m','C#','F#','B','E','Fdim'],
    Db: ['Fm','Bbm','Ebm','Ab','Db','Gb','B','Cdim'],
    Ab: ['Cm','Fm','Bbm','Eb','Ab','Db','Gb','Gdim'],
    Eb: ['Gm','Cm','Fm','Bb','Eb','Ab','Db','Ddim'],
    Bb: ['Dm','Gm','Cm','F','Bb','Eb','Ab','Adim'],
    G: ['Bm','Em','Am','D','G','C','F','F#dim'],
    Am: ['C','F','Bdim','Em','Am','Dm','G','E'],
    Bm: ['D','G','C#dim','F#m','Bm','Em','A','F#'],
    Cm: ['Eb','Ab','Ddim','Gm','Cm','Fm','Bb','G'],
    Dm: ['F','Bb','Edim','Am','Dm','Gm','C','A'],
    Em: ['G','C','F#dim','Bm','Em','Am','D','B'],
    Fm: ['Ab','Db','Gdim','Cm','Fm','Bbm','Eb','C'],
    Gm: ['Bb','Eb','Adim','Dm','Gm','Cm','F','D'],
    Fsm: ['A','D','G#dim','C#m','F#m','Bm','E','C#'],
    Csm: ['E','A','D#dim','G#m','C#m','F#m','B','G#'],
    Gsm: ['B','E','A#dim','D#m','G#m','C#m','F#','D#'],
    Ebm: ['Gb','B','Fdim','Bbm','Ebm','Abm','Db','Bb'],
    Bbm: ['Bbm','Cdim','Db','Ebm','Fm','Gb','Ab']
};

// Setup an array to hold the index of each picks chord sound (for audio sprites)
var pickSound = [0, 0, 0, 0, 0];
var pickChord = [0, 0, 0, 0, 0];

// The stopPlaying timeout
var stopPlaying;
    
// The chordsprite item
var chordsprite;
    
function init() {
    
    if(!window.jQuery) {
        alert('No jQuery!');
    }

    // Grap the chordsprite element
    chordsprite = document.getElementById('chordsprite');

    // Pick an initial set in the key of C
    show('C');
    
    // Bind the events
    $('#key').change(function() { show($('#key').val()); chordsprite.play(); chordsprite.pause(); });
    $('.refreshIcon').click(function() { show( $('#key').val() ); });
    
    // This is a bit of a hack for iOS. You must play on a user action and then setup the stopAndPlay routine
    // chordsprite.play(); chordsprite.pause();
    if ('ontouchstart' in document) {
        $('#pick1back').bind('touchstart', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(1); });
        $('#pick2back').bind('touchstart', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(2); });
        $('#pick3back').bind('touchstart', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(3); });
        $('#pick4back').bind('touchstart', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(4); });
        $('#pick5back').bind('touchstart', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(5); });
    } else {
        $('#pick1back').bind('click', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(1); });
        $('#pick2back').bind('click', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(2); });
        $('#pick3back').bind('click', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(3); });
        $('#pick4back').bind('click', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(4); });
        $('#pick5back').bind('click', function() { chordsprite.play(); chordsprite.pause(); stopAndPlay(5); });
    }

}

// Stop the current sound and start playing it again
function stopAndPlay(id) {
    // Clear the previous stopPlaying timeout so it doesn't interupt this chord
    clearTimeout(stopPlaying);
    chordsprite.currentTime = (pickSound[id]*2);
    chordsprite.play();
    // Set this chord to stop in two seconds, playing only one chord in the set of sprites
    stopPlaying = setTimeout( function() { chordsprite.pause() }, 2000);
}

// Pick and show 5 random chords for this key
function show(key) {
    var rand=0;
    // Set the chord sprite sound file for this key
    chordsprite.src = 'sounds/' + key + '.mp3';
    // Load the sound file then play and pause it (to kick mobile safari)
    // Loop through the 5 picks
    for(i=1;i<=5;i++) {
        // Fade out
        $('#pick' + i + 'back').fadeOut();
        // Pick a random number
        rand = Math.floor((Math.random()*chords[key].length));
        // Set this pick value
        $('#pick' + i).html(chords[key][rand]);
        // Set this picks sound chord number
        pickSound[i] = rand;
        pickChord[i] = chords[key][rand];
        // Fade in
        $('#pick' + i + 'back').fadeIn();
    }
}
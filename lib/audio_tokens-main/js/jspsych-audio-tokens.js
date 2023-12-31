/*
 * Example plugin template
 */

jsPsych.plugins["audio-tokens"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "audio-tokens",
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.OBJECT,
        default: ['file1.wav', 'file2.wav']
      },
      ratingtype: {
        type: jsPsych.plugins.parameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: 'cluster' // 'features', 'cluster' or 'similarity'
      },
      // Parameter for ratingtype 'features' and 'categories'
      label: {
        type: jsPsych.plugins.parameterType.OBJECT,
        default: ['Feature to rate']
        // for multiple features use:
        // ['1st Feature to rate', '2nd Feature to rate', '3rd Feature to rate']
      },
      // Parameter for ratingtype 'features'
      anchors: {
        type: jsPsych.plugins.parameterType.OBJECT,
        default: [['low', 'medium', 'high']]
        // for multiple features use:
        // [['low', 'medium', 'high'],
        //  ['low', 'medium', 'high'],
        //  ['low', 'medium', 'high']]
      },
      force_listen: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false
      },
      loop: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true
      },
      draw_edges: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: true
      },
      /** Any content here will be displayed below the stimulus. */
      prompt: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: "Prompt",
        default: null,
      },      
      mute_key: {
        type: jsPsych.plugins.parameterType.KEYS,
        default: ''
        // to enable a mute key, enter a key here, e.g. 's'
      }            
    }
  }

  plugin.trial = function(display_element, trial) {

    // Set defaults
    if (trial.force_listen) {
      trial.opacity = .5
    } else {
      trial.opacity = 1.
    }
    trial.width = 400
    trial.trial_id = ''
    trial.nextURL = display_element
    if (trial.ratingtype=='categories') {
      trial.item_spacing = 12.5
    } else {
      trial.item_spacing = 7.5
    }
    trial.jsPsych = jsPsych

    var height = {'features': 150*trial.label.length,
                  'cluster': 400,
                  'similarity': 400,
                  'features2d': 375,
                  'categories': 225,
                  'triplets': 150}

    // Generate html string
    var html = ''
    html += '<div class="container" style="margin-bottom:25px">'
    html += '<div class="d-flex justify-content-center">'
    html += '<div id="button-container" class="btn-group" style="margin-bottom:25px">'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '<div class="container" style="margin-bottom:25px">'
    html += '<div class="d-flex justify-content-center">'
    html += '<div id="plot-speakers-div">'
    html += '<svg id="plot-speakers" width="400" height="'+height[trial.ratingtype]+'">'
    html += '</div>'
    html += '</div>'
    html += '<div id="audio-container"></div>'

    //show prompt if there is one
    if (trial.prompt !== null) {
      html += trial.prompt;
    }

    display_element.innerHTML = html

    // Generate data for graph
    var num_speakers = trial.stimuli.length
    data = {'nodes': []}
    for (i=0; i<num_speakers; i++) {
      data.nodes.push({
        'id': 'item-'+String(i), 
        'audiofile': trial.stimuli[i],
        'x': [], 'y': []
      })
    }

    // Generate graph
    if (trial.ratingtype=='cluster') {
      var graph = new CircleSortGraph(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    } else if (trial.ratingtype=='similarity') {
      var graph = new AudioGraph(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    } else if (trial.ratingtype=='features') {
      var graph = new FeatureRatings(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    } else if (trial.ratingtype=='features2d') {
      var graph = new FeatureRatings2D(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    } else if (trial.ratingtype=='categories') {
      var graph = new FreesortGraph(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    } else if (trial.ratingtype=='triplets') {
      var graph = new TripletAudioGraph(
        data, 'plot-speakers', 'audio-container', 'button-container',
        isJsPsych=true, params=trial
      )
    }

    // Show graph
    graph.build()

  };

  return plugin;
})();

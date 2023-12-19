# Experimenter's manual for the CHiME-7 UDASE listening test

# Listening test

## General information

You will find in the `docs` folder
- [the instruction sheet for participants 1 to 16](<./docs/Instructions for listeners - subjects 1 to 16.pdf>);
- [the instruction sheet for participants 17 to 32](<./docs/Instructions for listeners - subjects 17 to 32.pdf>).

The only difference between the two instruction sheets (for participants 1-16 and 17-32) is the rating scale order in the different listening sessions.

## Brief description

We have a total number of 128 audio stimuli (audio samples taken from the `eval/listening_test` subset of the [segmented CHiME-5 dataset](https://www.chimechallenge.org/challenges/chime7/task2/data#chime-5-in-domain-unlabeled-data)), which are spread into 4 disjoint blocks of 32 stimuli. 

Participants 1 to 8 are associated to the first block, participants 9 to 16 to the second block, and so on.

The listening experiment includes 5 experimental conditions (4 speech enhancement systems + the unprocessed noisy input condition).

For each rating scale (SIG, BAK, OVRL), we target 8 votes per pair of stimulus and experimental condition. These votes will be used to compute mean opinion scores (MOS). That is why we need a total of 32 participants (8 different participants for each of the 4 blocks).

Each participant will evaluate the 32 stimuli in his/her block for all 5 experimental conditions and for all 3 rating scales. For each listener, one trial of the listening test corresponds to a pair of stimulus and experimental condition. The 32 stimuli x 5 experimental conditions = 160 trials form a complete listening experiment for one participant.  Each trial consists of 3 presentations of the same sound sample, to collect the votes for the 3 different rating scales.

The 160 trials are splitted into 4 listening sessions of 40 trials. Each session should last approximately 20 minutes, assuming 10 seconds to rate each presentation of a sound sample, whose duration is between 4 and 5 seconds. 

Before the aforementioned listening sessions, the participants will undergo a practice session to familiarize themselves with the task. This practice session of 48 trials consists of the reference conditions described in Table 1 of [(Naderi and Cutler, 2021)](https://arxiv.org/pdf/2010.13200.pdf). These reference conditions correspond to synthetic mixtures of speech and noise that have been designed to equalize the subjective range of quality ratings of all listeners. The practice session should last approximately 22 minutes, assuming 10 seconds to rate each presentation of a sound sample, whose duration is 4 seconds. 

The listening test for one participant therefore consists of 5 listening sessions. For more information, please read the documents listed in the above "General information" section.

# Organization of this repository

## Data

The `data` directory has the following structure:
```
├── C0
├── C1
├── C2
├── C3
├── C4
└── ref
```
Each folder `Cx` corresponds to an experimental condition: 
- `C0` corresponds to the noisy input condition (it corresponds to the `eval/listening_test` subset of the segmented CHiME-5 dataset).
- `C1` to `C4` correspond to the output of 4 speech enhancement systems.

Each folder `Cx` contains the same number of audio samples (wav files) with the same file names. The folder `ref` contains the reference conditions used in the practice session of the listening test.

**All audio samples in this data directory have been normalized to the same loudness (in LUFS).**

## JSON configuration files

The directory `js` contains the 32 configuration files `subject_X.json` for the 32 participants of the listening test. Configuration files are in a customized json format. You can open any of these files and you will see that each entry corresponds to an audio sample that should be played in a dedicated page of the software interface, and with a dedicated instruction. The randomization has already been done when creating the configuration files, these are thus read linearly by the software.

Each entry of a config file is characterized by the following pieces of information:
- `subset` (an integer between 1 and 4): a subset index, as the entire P.835 test is splitted into 4 blocks or subsets.
- `session` (an integer between 0 and 4): a listening session index. Session index 0 corresponds to the anchoring phase of the test (using the reference conditions). Session indices 1 to 5 correspond to the four listening sessions (using the experimental conditions). Participants should take a short rest period between each session. A dedicated page in the software will tell the participants to have a break.
- `file` (a string): path to the wav file.
- `scale` (a string which is `SIG`, `BAK` or `OVRL`): the rating scale for this sample, which is used to display the proper instruction and scale.

## HTML files

The directory `UDASE2023_CHiME_listening_test` contains the 32 HTML files `UDASE2023_CHiME_listening_test_participantXX.html` for the 32 participants of the listening test. Each HTML file is linked to the corresponding JSON file. These HTML files are the ones that should be opened to run the experiment for each participant (see below).

The HTML file `UDASE2023_CHiME_listening_test_demo.html` corresponds to a short demo with 5 sessions of one single trial. This HTML file is linked to the JSON file `subject_1_mini.json`. This demo can be used to quicly verify that the experiment runs correctly.

## Python script

The Python script `py/jsPsych_Data_cleaning_script.py` shows how to clean the data saved in a CSV file during and at the end of the experiment.

# How to run the experiment? 

Download/clone this repository and run/open the HTML files locally. 

## Data

The data (CSV files containg the results) are downloaded at the end of each listening session. We advice to configure the browser to automate the downloading of the files and prevent the opening of a window to accept and choose the downloading folder. This is to avoid disturbing the participant and loosing data. The file downloaded after the last listening session contains all the data for the entire listening experiment, all other files are backups in case the experiment is stopped before the end.

The filename of the CSV file is unique for each run of the experiment (i.e., each opening/reloading of an HTML file). So different filenames will be generated for different participants, but the filename remains the same throughout the experiment, i.e., the CSV files have the same name when saved at the end of different sessions of a same experiment.

However, the participant ID (the number between 1 and 32) is **not** stored in the output CSV file. **We thus ask the experimenter to please save in a separate file the link between the participant ID and the CSV file name**.

## Interruption of a listening experiment

If the full screen is lost, press **F11**.

If a listening experiment is interrupted and the web page corresponding to the HTML file of the experiment is closed or refreshed, there is no automatic mean of starting again the experiment from the last trial. Reopening the HTML file will restart the complete experiment.

The only way to restart in the middle of an experiment is to modify manually the JSON configuration file by removing the entries corresponding to the trials for which results have already been donwloaded. As data are saved after each listening session, it basically means removing the trials of the previously completed listening sessions. Each entry of a JSON file contains a `session` variable (integer between 0 and 4, the displayed session number equals this variable + 1).

In case of manual modification of a JSON, it is safer to create a backup file to restore the original JSON once the listening experiment is completed.

## How to select the HTML files when conducting the listening test?

For conducting the listening test, **the HTML files should be chosen according to the participant ID (or number) taken in an increasing order**, i.e., the morning experiment of day #1 should use the HTML file of participant #1, the afternoon experiment of day #2 should use the HTML file of participant #2, the morning experiment of day #2 should use the HTML file of participant #3, etc.

The test was designed such that 
- participants 1 to 8 will evaluate the same set $\mathcal{S}_1$ of 32 audio stimuli; 
- participants 9 to 16 will evaluate the same set $\mathcal{S}_2$ of 32 audio stimuli;
- and so on until $\mathcal{S}_4$.

Once the first panel consising of participants 1 to 8 has completed the listening experiment, we will be able to compute valid MOS by averaging the 8 votes for each of the 32 audio stimuli in $\mathcal{S}_1$. By conducting the listening experiment with the subsequent panels of listeners we will increase the number of valid MOS, using other audio stimuli. This is expected to reduce the dispersion of the MOS distribution for each experimental condition as more and more panels perform the listening test.
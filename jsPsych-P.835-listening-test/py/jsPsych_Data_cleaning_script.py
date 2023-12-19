
import pandas as pd

# Choose the correct .csv of data and import

df = pd.read_csv('mydata.csv')

# Only get the row with the response of the participant

df_response = df[df["task"] == "REPONSE SUJET"]

# Remove the unused "task" column which where usefull only to subset

df_final = df_response[["id", "date", "vol", "soundPlayed", "cond", "subset", "session", "responseScale"]]

print(df_final)

df_final.to_csv('mydata_cleaned.csv', index=False)


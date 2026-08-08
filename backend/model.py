import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import numpy as np

def preprocess_data():
    try:
        file_path1 = "./cost-of-living.csv"
        file_path2 = "./cost-of-living_v2.csv"
        
        df1 = pd.read_csv(file_path1)
        df2 = pd.read_csv(file_path2)
        
        df = pd.concat([df1, df2], ignore_index=True)
        
        df = df.drop_duplicates(subset=['city', 'country'], keep='first')
        #handling missing values:

        df = df[df['data_quality'] == 1]
        
        columns_kept = [
            "city",
            "country",
            "x1", "x2", "x3", "x9", "x10", "x11", "x12", "x13", "x14", "x15",
            "x16", "x17", "x18", "x19", "x20", "x21", "x22", "x23", "x28", "x29",
            "x33", "x36", "x37", "x38", "x39", "x40", "x41", "x48", "x49", "x50",
            "x51", "x54"
        ]

        df = df[columns_kept]
        
        key_columns = [c for c in columns_kept if c not in ("city", "country")]
        df = df.dropna(subset=key_columns)
        
        return df
    except Exception as e:
        print(f"Unexpected error in preprocess_data: {e}")
        return None


def feature_engineering(user_preferences):

    df = preprocess_data()

    if df is None:
        print("Preprocessing failed")
        return None
    
    df_features = df.copy(deep=True)

    #groceries
    df_features['groceries'] = (
        df['x9'] * 4 +          # Milk: 4 liters
        df['x10'] * 8 +         # Bread: 8 loaves
        df['x11'] * 2 +         # Rice: 2 kg
        df['x12'] * 3 +         # Eggs: 3 dozens
        df['x13'] * 1 +         # Cheese: 1 kg
        df['x14'] * 2 +         # Chicken: 2 kg
        df['x15'] * 1 +         # Beef: 1 kg
        df[['x16', 'x17', 'x18', 'x19', 'x20', 'x21', 'x22']].mean(axis=1) * 6  # Fruits/veg: 6 kg average
    )

    #bills
    df_features["bills"] = df["x36"] + df["x37"] + df["x38"] #electricity, phone, wifi

    #accommodation
    house_map = {
        ('center', 'studio'): 'x48',
        ('center', 'family'): 'x50',
        ('outside', 'studio'): 'x49',
        ('outside', 'family'): 'x51'
    }

    house_col = house_map[(user_preferences["location"], (user_preferences["housing_type"]))]
    df_features["accommodation"] = df[house_col]

    #transportation
    df_features["transport"] = df["x29"] if (user_preferences["transport_type"]).lower() == "public" else df["x33"] * user_preferences["gas_liters"]
   
    #entertainment
    ##eating out
    df_features["eating_out"] = df["x1"] * user_preferences["cheap_visits"] + (df["x2"]/2) * user_preferences["mid_visits"] + df["x3"] * user_preferences["fast_food_visits"]
    
    ##activities
    df_features["gym"] = df["x39"] if user_preferences["go_gym"] else 0
    df_features["tennis"] = df["x40"] * user_preferences["tennis_frequency"] if user_preferences["play_tennis"] else 0
    df_features["cinema"] = df["x41"] * user_preferences["cinema_visits"] if user_preferences["go_cinema"] else 0

    df_features["total_expenses"] = df_features[['groceries', 'eating_out', 'transport', 
                                              'bills', 'accommodation', 'gym', 
                                              'tennis', 'cinema']].sum(axis=1)
    
    df_features["savings"] = user_preferences["salary"] - df_features["total_expenses"]

    feature_matrix = df_features[['city', 'country', 'groceries', 'eating_out', 'transport'
                                  , 'bills', 'accommodation', 'gym', 'tennis', 'cinema', 'total_expenses', 'savings']]
    
    
    return feature_matrix


def build_user_vector(user_preferences):
    df = preprocess_data()
    
    avg = df.drop(columns=["city", "country"]).mean(axis=0)

    #groceries
    avg['groceries'] = (
        avg['x9'] * 4 +          # Milk: 4 liters
        avg['x10'] * 8 +         # Bread: 8 loaves
        avg['x11'] * 2 +         # Rice: 2 kg
        avg['x12'] * 3 +         # Eggs: 3 dozens
        avg['x13'] * 1 +         # Cheese: 1 kg
        avg['x14'] * 2 +         # Chicken: 2 kg
        avg['x15'] * 1 +         # Beef: 1 kg
        avg[['x16', 'x17', 'x18', 'x19', 'x20', 'x21', 'x22']].mean() * 6  # Fruits/veg: 6 kg average
    )

    #bills
    avg["bills"] = avg["x36"] + avg["x37"] + avg["x38"] #electricity, phone, wifi

    #accommodation
    house_map = {
        ('center', 'studio'): 'x48',
        ('center', 'family'): 'x50',
        ('outside', 'studio'): 'x49',
        ('outside', 'family'): 'x51'
    }

    house_col = house_map[(user_preferences["location"], (user_preferences["housing_type"]))]
    avg["accommodation"] = avg[house_col]

    #transportation
    avg["transport"] = avg["x29"] if (user_preferences["transport_type"]).lower() == "public" else avg["x33"] * user_preferences["gas_liters"]
   
    #entertainment
    ##eating out
    avg["eating_out"] = avg["x1"] * user_preferences["cheap_visits"] + (avg["x2"]/2) * user_preferences["mid_visits"] + avg["x3"] * user_preferences["fast_food_visits"]
    
    ##activities
    avg["gym"] = avg["x39"] if user_preferences["go_gym"] else 0
    avg["tennis"] = avg["x40"] * user_preferences["tennis_frequency"] if user_preferences["play_tennis"] else 0
    avg["cinema"] = avg["x41"] * user_preferences["cinema_visits"] if user_preferences["go_cinema"] else 0


    dimensions = ['groceries', 'eating_out', 'transport'
                                  , 'bills', 'accommodation', 'gym', 'tennis', 'cinema']

    return [avg[dim] for dim in dimensions]
    


def knn_rank(user_preferences):

    dimensions = ['groceries', 'eating_out', 'transport', 'bills', 
                  'accommodation', 'gym', 'tennis', 'cinema']
    feature_matrix = feature_engineering(user_preferences)
    if feature_matrix is None:
        print("No feature matrix")
        return None

    user_vector = build_user_vector(user_preferences)

    scaler = StandardScaler()

    feature_matrix_scaled = scaler.fit_transform(feature_matrix[dimensions].values)
    user_vector_2d = np.array(user_vector).reshape(1 ,-1)
    user_vector_scaled = scaler.transform(user_vector_2d)

    neigh = NearestNeighbors(n_neighbors=50, metric="euclidean", n_jobs=-1)
    neigh.fit(feature_matrix_scaled)

    distances, indices = neigh.kneighbors(user_vector_scaled)

    candidates = feature_matrix.iloc[indices[0]]
    candidates = candidates[(candidates["savings"] > 0)]

    top5 = candidates.sort_values("savings", ascending=False).head(5)
    print(top5)
    return top5






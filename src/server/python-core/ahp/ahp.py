import numpy as np
import json

def normalize_matrix(matrix):
    """
    Chuẩn hóa ma trận so sánh cặp bằng cách chia mỗi phần tử cho tổng cột tương ứng.
    """
    column_sums = np.sum(matrix, axis=0)
    return matrix / column_sums

def calculate_priority_vector(normalized_matrix):
    """
    Tính trọng số (priority vector) bằng cách lấy trung bình theo hàng của ma trận chuẩn hóa.
    """
    return np.mean(normalized_matrix, axis=1)

def consistency_ratio(matrix, priority_vector):
    """
    Tính chỉ số nhất quán CR để kiểm tra độ tin cậy của ma trận so sánh cặp.
    """
    n = matrix.shape[0]
    weighted_sum = np.dot(matrix, priority_vector)
    lambda_max = np.sum(weighted_sum / priority_vector) / n
    CI = (lambda_max - n) / (n - 1)  # Chỉ số nhất quán
    RI_dict = {1: 0.0, 2: 0.0, 3: 0.58, 4: 0.9, 5: 1.12, 6: 1.24}  # Chỉ số ngẫu nhiên
    RI = RI_dict.get(n, 1.24)
    CR = CI / RI  # Chỉ số nhất quán cuối cùng
    return CR

def aggregate_weights(level1_weights, level2_weights_dict):
    """
    Nhân trọng số tầng 1 với trọng số tầng 2 để ra trọng số tổng hợp cho từng tiêu chí phụ.
    """
    final_weights = {}
    for main_criterion, sub_weights in level2_weights_dict.items():
        for sub_criterion, weight in sub_weights.items():
            final_weights[sub_criterion] = level1_weights[main_criterion] * weight
    return final_weights

def calculate_total_score(weights, scores):
    """
    Tính điểm tổng cho từng phương án bằng cách nhân trọng số với điểm đánh giá.
    """
    total = {}
    for option, criteria in scores.items():
        score = sum(weights[k] * criteria[k] for k in weights)
        total[option] = score
    return total

def calculate_ahp(scores):
    main_matrix = np.array([
        [1,4,3],
        [1/4,1,1/2],
        [1/3,2,1]
    ])

    # Tính trọng số tầng 1
    normalized_main = normalize_matrix(main_matrix)
    main_weights = calculate_priority_vector(normalized_main)
    cr_main = consistency_ratio(main_matrix, main_weights)

    level1_named = {
        'Sức khỏe': main_weights[0],
        'Tài chính': main_weights[2],
        'Thói quen': main_weights[1]
    }


    level2_weights = {
        'weights_suckhoe' : {
        'Giấc ngủ': 0.45,
    'Độ căng thẳng': 0.30,
    'Vận động': 0.15,
    'Sức khỏe tổng quát': 0.10

    },
        'weights_taichinh' : {
         'Chi tiêu': 0.35,
    'Thu nhập': 0.30,
    'Tiết kiệm': 0.20,
    'Giải trí': 0.15

    },
        'weights_thoiquen' : {
        'Giờ học tập mỗi ngày': 0.40,
    'Giờ làm việc': 0.25,
    'Thời gian rảnh': 0.20,
    'Giờ hoạt động xã hội': 0.15

    }
    }

    final_weights = aggregate_weights(level1_named, level2_weights)

    result = calculate_total_score(final_weights,scores)
    
    return result

def build_scores_from_reference(input_data, reference_data):
    scores = {
        'A':{},
        'B':{},
        'C':{}
    }
    for option, info in input_data.items():
        muctieu = info.get('muctieu')
        mucdo = info.get('mucdo')

        if not muctieu or not mucdo:
            print(f"err")
            continue

        found = False
        for category, levels in reference_data.items():
            if mucdo in levels and muctieu in levels[mucdo]:
                weight = levels[mucdo][muctieu]
                scores[option][muctieu]=weight
                found = True
                break
    return scores

def lookup_data(datas_list):
    with open('../data.json','r' , encoding='utf-8') as f:
        reference_data=json.load(f)
    
    scores = build_scores_from_reference(datas_list, reference_data)
    result = calculate_ahp(scores)
    return result



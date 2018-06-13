// 数组是有序数组前提
function binarySearch(target,arr){
    let start = 0;
    let end = arr.length - 1;

    while(end > start){
        let mid = parseInt(start + (end - start) / 2);
        if(target == arr[mid]){
            return mid;
        }else if(target > arr[mid]){
            start = mid + 1;
        }else {
            end = mid - 1;
        }
    }
    return -1;
}
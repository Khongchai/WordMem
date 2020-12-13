export default function binarySearch(array: number[], target: number, start: number, end: number): number
{
    let middlePosition: number = Math.floor((start+end)/2);
    let stillElementsLeftToCheck: boolean = start < end;

    if (array[middlePosition] === target)
    {
        return middlePosition;
    }

    if (stillElementsLeftToCheck)
    {
        if (target > array[middlePosition])
        {
            let newStartPostionAfterCurrentMid = middlePosition + 1;
            return binarySearch(array, target, newStartPostionAfterCurrentMid, end);
        }
        else
        {
            let newEndPositionBeforeCurrentMid = middlePosition - 1;
            return binarySearch(array, target, start, newEndPositionBeforeCurrentMid);
        }
    }
    else
    {
        return -1;
    }
}
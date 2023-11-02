//task 1A
// Write a function insert_subseq that takes as arguments a list L , a 
// non-negative integer pos , and another list S , and returns a list that is the 
// result of inserting S at position (or index) pos of L .
function insert_subseq(L, pos, S) {
    if (is_null(L)) {
        return S;
    } else if (pos === 0) {
        return append(S, L);
    } else {
        return pair(head(L), insert_subseq(tail(L), pos - 1, S));
    }
}
insert_subseq( list(10, 11, 12), 1, null );
// returns list(10, 11, 12)
//testcases


//task 1B
/* Write a function remove_subseq that takes as arguments a non-empty list L , 
two non-negative integers start_pos and end_pos , and returns a list that is the 
result of removing from L all elements at positions
from start_pos to end_pos */

function remove_subseq(L, start_pos, end_pos) {
    function reverse_list_ref(ls, elem) { //returns the index of elem
        //kiv. please help
    }
    function from_start(xs, start, n) {
        if (head(xs) === start) {
            return null; 
        } else { 
            return from_start(tail(xs), start, n - 1);
    }
    function from_end(ys, end) {
        if (reverse_list_ref(ys, head(ys)) === end); {
            return member(head(ys), ys);
        } else {
            return pair(head(ys), from_end(tail(ys), end);
        }
        
    }
    return append(from_start(L, start_pos), from_end(L, end_pos));
    }
}
//testcases


//task 2A
/* Write a function is_prefix_of that takes as
arguments two lists of single-character
strings, subseq and seq , and returns true if and
only if subseq is a prefix of seq , which is true
if subseq occurs at the very beginning of seq . Note
that the input seq may be shorter than subseq , and
any of them may be an empty list. */

function is_prefix_of(subseq, seq) {
    if (length(subseq) > length(seq)) {
        return false;
    } else if (is_null(subseq)) {
        return true;
    } else if (head(subseq) === head(seq)) {
        return is_prefix_of(tail(subseq), tail(seq))
               ? true
               : false;
    } else {
        return false;
    }
}

//testcases


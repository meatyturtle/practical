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
EQUAL(insert_subseq( list(10,
11, 12), 0, list(55, 66) ),
list(55, 66, 10, 11, 12));




//task 1B
/* Write a function remove_subseq that takes as arguments a non-empty list L , 
two non-negative integers start_pos and end_pos , and returns a list that is the 
result of removing from L all elements at positions
from start_pos to end_pos */

function remove_subseq(L, start_pos, end_pos) {
    return end_pos === 0
           ? tail(L)
           : start_pos === 0
           ? remove_subseq(tail(L), start_pos, end_pos - 1)
           : pair(head(L), remove_subseq(tail(L), start_pos - 1, end_pos - 1));
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
    
    //alternative solution
     return is_null(subseq)
        ? true
        : is_null(seq) //acoounts for length(subseq) > length(seq)
        ? false
        : head(subseq) === head(seq) &&
          is_prefix_of(tail(subseq), tail(seq));
}

//testcases

//task 2B
function tail_n_times(xs, n) {
    return is_null(xs)
           ? null
           : n <= 0
           ? xs
           : tail_n_times(tail(xs), n - 1);
}

function subseq_replace(new_sub, old_sub, seq) {
    if (is_null(seq)) {
        return null;
    } else if (!is_prefix_of(old_sub, seq)) {
        return pair(head(seq), subseq_replace(new_sub, old_sub, tail(seq)));
    } else {
        const old_sub_len = length(old_sub);
        return append(new_sub, subseq_replace(new_sub, old_sub,
                                              tail_n_times(seq, old_sub_len)));
    }
}

// //task 3A
// /* Write a function make_NiFT that takes as argument a tree of numbers, T , and 
// returns a NiFT S of T , where S has all the elements of T , and in every list 
// of S , all the number elements come before all the elements that are trees.
// The relative positions of the number elements in each list of S must be 
// maintained as in T , and the same applies to the elements that are trees in 
// each list of S . */

function make_NiFT(T) {
    if (is_null(T)) {
        return null;
    } else if (!is_list(T)) { //if not list is a number
        return pair(head(T), make_NiFT(tail(T)));
    } else { //head is a list
        const T2 = map(x => make_NiFT(x), T);
        const list_of_nums = filter(x => !is_list(x), T2);
        const list_of_lists = filter(x => is_list(x), T2);
        return append(list_of_nums, list_of_lists);
    } 
}

//task 3B 
function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

function map_tree(fun, tree) {
    return map(sub_tree =>
                   !is_list(sub_tree)
                   ? fun(sub_tree)
                   : map_tree(fun, sub_tree),
               tree);
}

function flatten_tree(T) {
    return accumulate((x, ys) => is_list(x)
                                 ? append(flatten_tree(x), ys)
                                 : append(list(x), ys),
                      null, T);
}

function make_SToN(T) {
    let sorted_list = insertion_sort(flatten_tree(T));

    function traverse_sorted_list(x) {
        const h = head(sorted_list);
        sorted_list = tail(sorted_list);
        return h;
    }

    return map_tree(traverse_sorted_list, T);
}

//task 4
function shortest_path_length(maze, start_row, start_col) {
    const nrows = array_length(maze);
    const ncols = array_length(maze[0]);

    function min_path_len(r, c) {
        if (r < 0 || r >= nrows || c < 0 || c >= ncols) {
            return Infinity;
        } else if (maze[r][c] === "#") {
            return Infinity;
        } else if (maze[r][c] === "G") {
            return 0;
        } else {
            const orig_cell_val = maze[r][c];
            maze[r][c] = "#";

            const east  = min_path_len(r, c + 1);
            const north = min_path_len(r - 1, c);
            const west  = min_path_len(r, c - 1);
            const south = min_path_len(r + 1, c);

            maze[r][c] = orig_cell_val;

            return 1 + math_min(east, north, west, south);
        }
    }
    return min_path_len(start_row, start_col);
}

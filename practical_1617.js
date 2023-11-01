// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 1A
////////////////////////////////////////////////////////////

function is_nucleobase(s) {
    if (s === "A" || s === "T" || s === "C" || s === "G") {
        return true;
    } else {
        return false; //dont even need true or false lol
    }
}



////////////////////////////////////////////////////////////
// Question 1B
////////////////////////////////////////////////////////////

function is_dna_strand(xs) {
    function helper(ys) {
        return filter(is_nucleobase, ys);
    }
    // WRITE HERE.
    if (length(helper(xs)) === length(xs)) {
        return true;
    } else {
        return false;
    }
} 



////////////////////////////////////////////////////////////
// Question 1C
////////////////////////////////////////////////////////////

function combine(xss) {
    return accumulate((x, y) => append(x, y), null, xss);

}



////////////////////////////////////////////////////////////
// Question 1D
////////////////////////////////////////////////////////////

function oxoguanine_repair(xs) {
    // if (is_null(xs)) {
    //     return null;
    // } else if (head(xs) === "8") {
    //     return pair("G", oxoguanine_repair(tail(xs)));
    // } else {
    //     return pair(head(xs), oxoguanine_repair(tail(xs)));
    // }
    return map(x => x === "8" ? "G" : x, xs);
}



////////////////////////////////////////////////////////////
// Question 1E
////////////////////////////////////////////////////////////

function find_gene_start(xs) {
//     if (is_null(xs)) {
//         return null; 
//     } else if (head(xs) === "A") {
//         if (head(tail(xs) === "T")) {
//             return head(tail(tail(xs))) === "G"
//                   ? accumulate((x, y) => pair(x, y), null, head(tail(tail(tail(xs)))));
//                   : find_gene_start(tail(tail(xs)));
//         } else {
//             return find_gene_start(tail(xs));
//         }
//     } else {
//         return find_gene_start(tail(xs));
//     }

    function at_least_length(ys, n) {
        if (n === 0) {
            return true;
        } else if (is_null(ys)) {
            return false;
        } else {
            return at_least_length(tail(ys), n - 1);
        }
    }
    if (at_least_length(xs, 3)) {
        if (head(xs) === "A" &&
            head(tail(xs)) === "T" &&
            head(tail(tail(xs))) === "G") {
            return list(tail(tail(tail(xs))));
        } else {
            return find_gene_start(tail(xs));
        }
    } else {
        return null;
    }


}



////////////////////////////////////////////////////////////
// Question 1F
////////////////////////////////////////////////////////////

function find_gene_end(xs) {
    function at_least_length(ys, n) {
        if (n === 0) {
            return true;
        } else if (is_null(ys)) {
            return false;
        } else {
            return at_least_length(tail(ys), n - 1);
        }
    }
    function is_prefix(ys, zs) {
        if (is_null(ys)) {
            return true;
        } else if (is_null(zs)) {
            return false;
        } else if (head(ys) === head(zs)) {
            return is_prefix(tail(ys), tail(zs));
        } else {
            return false;
        }
    }
    function find_end(ws, acc) {
        if (at_least_length(ws, 3)) {
            if (is_prefix(list("T", "A", "G"), ws) ||
                is_prefix(list("T", "A", "A"), ws) ||
                is_prefix(list("T", "G", "A"), ws)) {
                return list(reverse(acc));
            } else {
                return find_end(tail(ws), pair(head(ws), acc));
            }
        } else {
             return null;
        }
    }
    return find_end(xs, null);
}



////////////////////////////////////////////////////////////
// Question 1G
////////////////////////////////////////////////////////////

function all_genes(xs) {
   const start = find_gene_start(xs);
    if (is_null(start)) {
        return null;
    } else {
        const end = find_gene_end(head(start));
        if (is_null(end)) {
            return null;
        } else {
            return pair(head(end), all_genes(head(start)));
        }
    }
}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
    display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================



////////////////////////////////////////////////////////////
// Test Cases for Q1A
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(is_nucleobase("Mary"), false);
    },
    "Q1A-P01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("T"), true);
    },
    "Q1A-P02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("^^^"), false);
    },
    "Q1A-P03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("Mary"), false);
    },
    "Q1A-T01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("G"), true);
    },
    "Q1A-T02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("A"), true);
    },
    "Q1A-T03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("TAG"), false);
    },
    "Q1A-T04",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_nucleobase("C"), true);
    },
    "Q1A-T05",
    ['is_nucleobase']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1B
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(is_dna_strand(list("A", "G", "A")), true);
    },
    "Q1B-P01",
    ['is_dna_strand']
);

assert(
    () => {
        return equal(is_dna_strand(list("A", "B", "B", "A")), false);
    },
    "Q1B-P02",
    ['is_dna_strand']
);


assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C")), true);
    },
    "Q1B-P03",
    ['is_dna_strand']
);


assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "Otto")), false);
    },
    "Q1B-P04",
    ['is_dna_strand']
);

assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C", "B")), false);
    },
    "Q1B-T01",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(null), true);
    },
    "Q1B-T02",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("A", "A", "A")), true);
    },
    "Q1B-T03",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("_", "A", "T")), false);
    },
    "Q1B-T04",
    ['is_nucleobase']
);

assert(
    () => {
        return equal(is_dna_strand(list("T", "G", "C", "TT")), false);
    },
    "Q1B-T05",
    ['is_nucleobase']
); 



////////////////////////////////////////////////////////////
// Test Cases for Q1C
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(combine(list(list("A", "G", "A", "T", "A"),
                                  list("A"),
                                  list("G", "A", "G"))),
                    list("A", "G", "A", "T", "A", "A", "G", "A", "G"));
    },
    "Q1C-P01",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("G"),
                                  list("G"),
                                  list("C", "T", "C", "T"),
                                  list("A"))),
                     list("G", "G", "C", "T", "C", "T", "A"));
    },
    "Q1C-P02",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("A", "A", "A"),
                                  list("G"),
                                  list("C", "G", "C", "T"),
                                  list("A", "C"))),
                     list("A", "A", "A", "G", "C", "G", "C", "T", "A", "C"));
    },
    "Q1C-T01",
    ['combine']
);

assert(
    () => {
        return equal(combine(null),
                     null);
    },
    "Q1C-T02",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(null)),
                     null);
    },
    "Q1C-T03",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(list("A"))),
                     list("A"));
    },
    "Q1C-T04",
    ['combine']
);

assert(
    () => {
        return equal(combine(list(null, null, list("T"))),
                     list("T"));
    },
    "Q1C-T05",
    ['combine']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1D
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "8", "A", "8", "C", "T", "A", "C")),
                     list("A", "G", "A", "G", "C", "T", "A", "C"));
    },
    "Q1D-P01",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("8", "8", "8", "8", "8")),
                     list("G", "G", "G", "G", "G"));
    },
    "Q1D-T01",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "A", "A", "A")),
                     list("A", "A", "A", "A"));
    },
    "Q1D-T02",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(null),
                     null);
    },
    "Q1D-T03",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("A", "T", "G", "C", "8")),
                     list("A", "T", "G", "C", "G"));
    },
    "Q1D-T04",
    ['oxoguanine_repair']
);

assert(
    () => {
        return equal(oxoguanine_repair(list("8", "C")),
                     list("G", "C"));
    },
    "Q1D-T05",
    ['oxoguanine_repair']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1E
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(find_gene_start(list("A", "C", "A", "T", "G", "T", "A", "C")),
                     list(list("T", "A", "C")));
    },
    "Q1E-P01",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "C", "G", "T", "A", "C")),
                     null);
    },
    "Q1E-P02",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "G", "T", "A", "T", "G")),
                     list(null));
    },
    "Q1E-P03",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(null),
                     null);
    },
    "Q1E-T01",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "A", "A", "T", "G", "A", "T", "G")),
                     list(list("A", "T", "G")));
    },
    "Q1E-T02",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "G", "C", "G", "T", "A", "C")),
                     list(list("C", "G", "T", "A", "C")));
    },
    "Q1E-T03",
    ['find_gene_start']
);

assert(
    () => {
        return equal(find_gene_start(list("A", "T", "A", "T", "A", "T", "A", "T")),
                     null);
    },
    "Q1E-T04",
    ['find_gene_start']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1F
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(find_gene_end(list("A", "G", "A", "G", "T", "A", "A", "T", "A", "A")),
                     list(list("A", "G", "A", "G")));
    },
    "Q1F-P01",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("A", "T", "A", "C", "C", "A", "G", "A", "T")),
                     null);
    },
    "Q1F-P02",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "G", "A", "A", "T", "A", "C")),
                     list(null));
    },
    "Q1F-P03",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("G", "C", "T", "G", "A", "T", "A", "A")),
                     list(list("G", "C")));
    },
    "Q1F-T01",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "T", "A", "C", "A", "G", "A", "T")),
                     null);
    },
    "Q1F-T02",
    ['find_gene_end']
);

assert(
    () => {
        return equal(find_gene_end(list("T", "A", "A", "T", "G", "A", "C")),
                     list(null));
    },
    "Q1F-T03",
    ['find_gene_end']
);



////////////////////////////////////////////////////////////
// Test Cases for Q1G
////////////////////////////////////////////////////////////

assert(
    () => {
        return equal(all_genes(list("C", "T", "A", "A", "G", "C")),
                     null);
    },
    "Q1G-P01",
    ['all_genes']
);

assert(
    () => {
        return equal(all_genes(list("A", "A", "T", "G", "A", "C", "T",
                                    "A", "G", "G")),
                     list(list("A", "C")));
    },
    "Q1G-P02",
    ['all_genes']
);

assert(
    () => {
        return equal(all_genes(list("T", "A", "T", "G", "C", "A", "T",
                                    "A", "A", "G", "T", "A", "G", "A",
                                    "T", "G", "A", "T", "G", "A", "T")),
                     list(list("C", "A"), list("A")));
    },
    "Q1G-P03",
    ['all_genes']
);

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 2A
////////////////////////////////////////////////////////////

function all_different(nums) {
    // function partition(xs, p) {
    //     return is_null(xs) 
    //           ? pair(null, null)
    //           : pair(filter(x => x <= p, xs), filter(x => x > p, xs));
    // }
    
    // function quicksort(xs) {
    //     return is_null(xs)
    //           ? null 
    //           : append(
    //               quicksort(head(partition(tail(xs), head(xs)))), 
    //               pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
    // }
    // const ys = quicksort(nums);
    // if (is_null(tail(nums))) {
    //     return true;
    // } else if (head(nums) === head(tail(nums))) {
    //     return false;
    // } else {
    //     return all_different(tail(nums));
    // }
    if (is_null(nums)) {
        return true;
    } else {
        const head_unique = is_null(member(head(nums), tail(nums)));
        return head_unique && all_different(tail(nums));
    }
}



////////////////////////////////////////////////////////////
// Question 2B
////////////////////////////////////////////////////////////

function is_valid_toto_set(nums, n, min, max) {
    function is_in_range(low, high, xs) {
        if (is_null(xs)) {
            return true;
        } else if (head(xs) >= low && head(xs) <= high) {
            return is_in_range(low, high,tail(xs));
        } else {
            return false;
        }
    }
    //or can also use
    // accumulate(
                // (a, b) => (a >= min && a <= max) && b,
                // true, nums);
    if (length(nums) === n) {
        if (all_different(nums)) {
            if (is_in_range(min, max, nums)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}



////////////////////////////////////////////////////////////
// Question 2C
////////////////////////////////////////////////////////////

function num_of_matches(numsA, numsB) { //HELP ME!!
    // let counter = 0;
    // if (is_null(numsB)) { //wait i need to figure out how to restart numsB
    //     return num_of_matches(tail(numsA), numsB);
    // } else if (is_null(numsA)) {
    //     return null;
    // } else if (head(numsA) === head(numsB)) {
    //     counter = counter + 1;
    //     return num_of_matches(numsA, tail(numsB));
    // }
    // return counter; 
    return accumulate(
           (a, b) => b + (is_null(member(a, numsB)) ? 0 : 1),
           0, numsA);
}



////////////////////////////////////////////////////////////
// Question 2D
////////////////////////////////////////////////////////////

function check_winning_group(bet_nums, draw_nums, extra_num) {
    function helper(bet, extra) {
        if (is_null(bet)) {
            return false;
        } else if (head(bet) === extra) {
            return true;
        } else {
            return helper(tail(bet), extra);
        }
    }
    //can just use !is_null(member(extra_num, bet_nums));

    if (num_of_matches(bet_nums, draw_nums) === length(draw_nums)) {
        return 1;
    } else if (num_of_matches(bet_nums, draw_nums) === length(draw_nums) - 1) {
        if (helper(bet_nums, extra_num)) {
            return 2;
        } else {
            return 3;
        }
    } else if (num_of_matches(bet_nums, draw_nums) === length(draw_nums) - 2) {
        if (helper(bet_nums, extra_num)) {
            return 4;
        } else {
            return 5;
        }  
    } else {
        return 0;
    }

}
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
    display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================



////////////////////////////////////////////////////////////
// Test Cases for Q2A
////////////////////////////////////////////////////////////

assert(
    () => {
        const nums = list(23);
        return equal(all_different(nums), true);
    },
    "Q2A-T1",
    ['all_different']
);

assert(
    () => {
        const nums = list(2, 5, 1, 6, 7, 4, 3);
        return equal(all_different(nums), true);
    },
    "Q2A-T2",
    ['all_different']
);

assert(
    () => {
        const nums = list(2, 6, 1, 7, 6, 4, 3);
        return equal(all_different(nums), false);
    },
    "Q2A-T3",
    ['all_different']
);

assert(
    () => {
        const nums = list(3, 2);
        return equal(all_different(nums), true);
    },
    "Q2A-T4",
    ['all_different']
);

assert(
    () => {
        const nums = list(3, 2, 1, 9, 8);
        return equal(all_different(nums), true);
    },
    "Q2A-T5",
    ['all_different']
);

assert(
    () => {
        const nums = list(2, 6, 3, 7, 6, 6, 3, 1);
        return equal(all_different(nums), false);
    },
    "Q2A-T6",
    ['all_different']
);



////////////////////////////////////////////////////////////
// Test Cases for Q2B
////////////////////////////////////////////////////////////

assert(
    () => {
        const nums = list(5, 1, 8, 49);
        const n = 6;
        const min = 1;
        const max = 49;
        return equal(is_valid_toto_set(nums, n, min, max), false);
    },
    "Q2B-T1",
    ['is_valid_toto_set']
);

assert(
    () => {
        const nums = list(25, 13, 2, 31, 30, 3, 15);
        const n = 7;
        const min = 3;
        const max = 30;
        return equal(is_valid_toto_set(nums, n, min, max), false);
    },
    "Q2B-T2",
    ['is_valid_toto_set']
);

assert(
    () => {
        const nums = list(25, 13, 8, 14, 30, 3, 8);
        const n = 7;
        const min = 3;
        const max = 30;
        return equal(is_valid_toto_set(nums, n, min, max), false);
    },
    "Q2B-T3",
    ['is_valid_toto_set']
);

assert(
    () => {
        const nums = list(25, 13, 8, 14, 30, 3, 15);
        const n = 7;
        const min = 3;
        const max = 30;
        return equal(is_valid_toto_set(nums, n, min, max), true);
    },
    "Q2B-T4",
    ['is_valid_toto_set']
);

assert(
    () => {
        const nums = list(40, 20, 30, 15, 10);
        const n = 5;
        const min = 10;
        const max = 40;
        return equal(is_valid_toto_set(nums, n, min, max), true);
    },
    "Q2B-T5",
    ['is_valid_toto_set']
);

assert(
    () => {
        const nums = list(40, 20, 30, 15, 40);
        const n = 5;
        const min = 10;
        const max = 40;
        return equal(is_valid_toto_set(nums, n, min, max), false);
    },
    "Q2B-T6",
    ['is_valid_toto_set']
);



////////////////////////////////////////////////////////////
// Test Cases for Q2C
////////////////////////////////////////////////////////////

assert(
    () => {
        const numsA = list(23, 21, 30, 15, 40);
        const numsB = list(3, 29, 40, 15, 20 );
        return equal(num_of_matches(numsA, numsB), 2);
    },
    "Q2C-T1",
    ['num_of_matches']
);

assert(
    () => {
        const numsB = list(23, 21, 30, 15, 40);
        const numsA = list(3, 29, 40, 15, 20);
        return equal(num_of_matches(numsA, numsB), 2);
    },
    "Q2C-T2",
    ['num_of_matches']
);

assert(
    () => {
        const numsA = list(23, 21, 30, 15, 40);
        const numsB = list(31, 29, 41, 16, 20);
        return equal(num_of_matches(numsA, numsB), 0);
    },
    "Q2C-T3",
    ['num_of_matches']
);

assert(
    () => {
        const numsA = list(23, 21, 30, 15, 40, 4, 2, 1);
        const numsB = list(1, 21, 23, 30, 4, 15, 2, 40);
        return equal(num_of_matches(numsA, numsB), 8);
    },
    "Q2C-T4",
    ['num_of_matches']
);

assert(
    () => {
        const numsA = list(2, 1, 30, 15);
        const numsB = list(31, 29, 41, 16);
        return equal(num_of_matches(numsA, numsB), 0);
    },
    "Q2C-T5",
    ['num_of_matches']
);

assert(
    () => {
        const numsA = list(2, 1, 30, 15);
        const numsB = list(15, 29, 2, 16);
        return equal(num_of_matches(numsA, numsB), 2);
    },
    "Q2C-T6",
    ['num_of_matches']
);

assert(
    () => {
        const numsA = list(23, 21, 30, 15, 40, 4, 2, 1, 35);
        const numsB = list(1, 21, 23, 35, 30, 4, 15, 2, 40);
        return equal(num_of_matches(numsA, numsB), 9);
    },
    "Q2C-T7",
    ['num_of_matches']
);



////////////////////////////////////////////////////////////
// Test Cases for Q2D
////////////////////////////////////////////////////////////

assert(
    () => {
        const bet_nums = list(40, 30, 1, 49, 23, 15);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 1);
    },
    "Q2D-T1",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(40, 30, 1, 49, 27, 15);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 2);
    },
    "Q2D-T2",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(40, 30, 1, 49, 17, 15);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 3);
    },
    "Q2D-T3",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(40, 27, 1, 49, 17, 15);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 4);
    },
    "Q2D-T4",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(40, 37, 1, 49, 17, 15);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 5);
    },
    "Q2D-T5",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(40, 37, 1, 49, 17, 27);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 0);
    },
    "Q2D-T6",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(21, 32, 1, 49, 27, 15, 3);
        const draw_nums = list(21, 30, 1, 49, 27, 15, 3);
        const extra_num = 32;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 2);
    },
    "Q2D-T7",
    ['check_winning_group']
);

assert(
    () => {
        const bet_nums = list(41, 37, 2, 48, 17, 27);
        const draw_nums = list(23, 1, 30, 15, 40, 49);
        const extra_num = 27;
        return equal(check_winning_group(bet_nums, draw_nums, extra_num), 0);
    },
    "Q2D-T8",
    ['check_winning_group']
);

// Instructions for students who are using this for practice:

// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.

//////////////////////////////////////////////////////////
// Question 3A
//////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {
    // function evaluate(x, op, y) {
    //     if (op === "+") {
    //         return x + y;
    //     } else if (op === "-") {
    //         return x - y;
    //     } else if (op === "*") {
    //         return x * y;
    //     } else {
    //         return x / y;
    //     }
    // }
    // if (is_list(bae_tree)) {
    //     const left = evaluate(head(bae_tree), 
    //                           head(tail(bae_tree)), 
    //                           head(tail(tail(bae_tree))));
    // } else { //is a number
    //     return bae_tree;
    // }
    if (is_list(bae_tree)) {
        const left = evaluate_BAE_tree(head(bae_tree));
        const right = evaluate_BAE_tree(head(tail(tail(bae_tree))));
        const op = head(tail(bae_tree));
        if (op === "+") {
            return left + right;
        } else if (op === "-") {
            return left - right;
        } else if (op === "*") {
            return left * right;
        } else { // (op === "/")
            return left / right;
        }
    } else { // is a number
        return bae_tree;
    }
 }



////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

function build_BAE_tree(bae_list) {
    let next_token = bae_list;

    function build_tree() {
        if (equal(head(next_token), "(")) {
            next_token = tail(next_token);
            const left_tree = build_tree();
            const op = head(next_token);
            next_token = tail(next_token);
            const right_tree = build_tree();
            next_token = tail(next_token); // skip over ")"
            return list(left_tree, op, right_tree);
        } else { // token is a number
            const token = head(next_token);
            next_token = tail(next_token);
            return token;
        }
    }

    return build_tree();

}



////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}



////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {
    function check(count, xs) {
        if (is_null(xs)) {
            return count === 0;
        } else if (count < 0) {
            return false;
        } else if (head(xs) === "(") {
            return check(count + 1, tail(xs));
        } else {
            return check(count - 1, tail(xs));
        }
    }
    return check(0, paren_list);
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


//===========================================================
// This function is provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===========================================================
function assert(f, test_name, fnames) {
    display(test_name + ": " + (f() ? "PASS" : "FAIL"));
}
//===========================================================



////////////////////////////////////////////////////////////
// Test Cases for Q3A
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        return equal(evaluate_BAE_tree(bae_tree), 23);
    },
    "Q3A-T1",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        return equal(evaluate_BAE_tree(bae_tree), 30);
    },
    "Q3A-T2",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 50);
    },
    "Q3A-T3",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 60);
    },
    "Q3A-T4",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        return equal(evaluate_BAE_tree(bae_tree), 80);
    },
    "Q3A-T5",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        return equal(evaluate_BAE_tree(bae_tree), 100);
    },
    "Q3A-T6",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        return equal(evaluate_BAE_tree(bae_tree), 55);
    },
    "Q3A-T7",
    ['evaluate_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        return equal(evaluate_BAE_tree(bae_tree), 9);
    },
    "Q3A-T8",
    ['evaluate_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3B
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_tree = 23;
        const bae_list = list(23);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T1",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", 6);
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T2",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(5, "*", list(7, "+", 3));
        const bae_list = list("(", 5, "*", "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T3",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(8, "-", 2), "*", list(7, "+", 3));
        const bae_list = list("(", "(", 8, "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T4",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(20, "/", 2), "-", 2), "*",
                            list(7, "+", 3));
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T5",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = 100;
        const bae_list = list(100);
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T6",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(70, "-", 15);
        const bae_list = list("(", 70, "-", 15, ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T7",
    ['build_BAE_tree']
);

assert(
    () => {
        const bae_tree = list(list(list(7, "+", 5), "*", 3), "/",
                            list(list(20, "/", 2), "-", list(100, "-", 94)));
        const bae_list = list("(", "(", "(", 7, "+", 5, ")", "*", 3, ")", "/",
                            "(", "(", 20, "/", 2, ")", "-",
                                 "(", 100, "-", 94, ")", ")", ")");
        return equal(build_BAE_tree(bae_list), bae_tree);
    },
    "Q3B-T8",
    ['build_BAE_tree']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3C
////////////////////////////////////////////////////////////

assert(
    () => {
        const bae_list = list(23);
        return equal(evaluate_BAE(bae_list), 23);
    },
    "Q3C-T1",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", 5, "*", 6, ")");
        return equal(evaluate_BAE(bae_list), 30);
    },
    "Q3C-T2",
    ['evaluate_BAE']
);

assert(
    () => {
        const bae_list = list("(", "(", "(", 20, "/", 2, ")", "-", 2, ")", "*",
                            "(", 7, "+", 3, ")", ")");
        return equal(evaluate_BAE(bae_list), 80);
    },
    "Q3C-T3",
    ['evaluate_BAE']
);



////////////////////////////////////////////////////////////
// Test Cases for Q3D
////////////////////////////////////////////////////////////

assert(
    () => {
        const paren_list = list();
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T1",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T2",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                  "(", "(", ")", "(", ")", ")", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T3",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list(")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T4",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", ")", ")", "(", "(", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T5",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", ")", "(");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T6",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", ")", "(", ")", "(", ")");
        return equal(check_parentheses(paren_list), true);
    },
    "Q3D-T7",
    ['check_parentheses']
);

assert(
    () => {
        const paren_list = list("(", "(", "(", ")", ")",
                                  "(", "(", ")", ")", ")", ")", ")");
        return equal(check_parentheses(paren_list), false);
    },
    "Q3D-T8",
    ['check_parentheses']
);


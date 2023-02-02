let col_len = 1,
    row_len = 1,
    set_start_bool = false,
    set_exit_bool = false,
    start_pos = null,
    exit_pos = null,
    found_exit = null,
    create_wall = false,
    visited_cells = new Set()

function add_col() {
    col_len++
    var rows = document.getElementsByClassName("row")
    for(let i = 0; i < rows.length; i++){
        const col = document.createElement("div");
        textNode = document.createTextNode(`${col_len},${i+1}`);
        // col.append(textNode)             added numbers for debugging
        col.id = `${col_len},${i+1}`
        col.onclick = function(){set_start_exit(this.id)}
        rows[i].style.gridTemplateColumns = `repeat(${col_len}, 1fr)`
        rows[i].appendChild(col);
    } 
}

function add_row() {
    row_len++
    // document.getElementById("grid-container").style.gridTemplateRows = `repeat(${row_len}, 1fr)`
    var new_row = document.createElement("div")
    new_row.className = "row"

    for(let i = 0; i<col_len; i++){
        const col = document.createElement("div");
        textNode = document.createTextNode(`${i+1},${row_len}`);
        new_row.style.gridTemplateColumns = `repeat(${col_len}, 1fr)`
        // col.append(textNode)             added numbers for debugging
        col.id = `${i+1},${row_len}`
        col.onclick= function(){set_start_exit(this.id)}
        new_row.appendChild(col)
    }
    document.getElementById("grid-container").appendChild(new_row)
}

function set_start(){
    console.log(start_pos)
    set_start_bool = true
    if (set_exit_bool == true){
        set_exit_bool = false
    }
}

function set_exit(){
    console.log(start_pos)
    console.log(exit_pos)
    set_exit_bool = true
    if (set_start_bool == true){
        set_start_bool = false
    }
}

function reset(){
    for(let i = 1; i <= row_len; i++){
        for(let j = 1; j<= col_len; j++){
            var el = document.getElementById([j, i].toString())
            el.style.backgroundColor = "#7289da"
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = null; 
        }
    }
    visited_cells.clear()
}

function make_wall(){
    if (create_wall == false){
        create_wall = true
    } else {
        create_wall = false
    }


}

function set_start_exit(clicked_id) {
    // create start as an array for easier traversal
    if (set_start_bool == true){
        start_pos = clicked_id.split(",")
        start_pos = start_pos.map(Number)
        document.getElementById(clicked_id).style.backgroundColor = "green"
        set_start_bool = false
        console.log(start_pos)
    }
    

    if (set_exit_bool == true){
        exit_pos = clicked_id
        set_exit_bool = false
        document.getElementById(clicked_id).style.backgroundColor = "red"
        console.log(exit_pos)
    }   

    if (create_wall == true){
        visited_cells.add(clicked_id)
        console.log(clicked_id,visited_cells)
        document.getElementById(clicked_id).style.backgroundColor = "blue"
    }
}


function dfs(){
    found_exit = false
    console.log("rows =", row_len, "cols =", col_len, "start =", start_pos, "exit =", exit_pos)
    
    
    dfs_recur(start_pos, exit_pos, visited_cells)
    sleep(3)

}

async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

async function dfs_recur(cur_pos, exit_pos, visited){
    console.log(cur_pos)
    let cur_pos_id = cur_pos.toString();
    console.log(cur_pos_id, visited)
    let x = cur_pos[0],
        y = cur_pos[1]

    if(1 > x || x > col_len || 1 > y || y > row_len){
        console.log("hit end")
        return
    }

    //need to add condition about if there is a wall

    visited.add(cur_pos_id)
    await sleep(.1)
    console.log("HELLOOOO")
    document.getElementById(cur_pos_id).style.backgroundColor = "green"
  
    if (cur_pos_id == exit_pos){
        document.getElementById(cur_pos_id).style.backgroundColor = "yellow"
        found_exit = true
        return 
    }

    let next_pos = [x+1,y].toString()
    if (visited.has(next_pos) != true && found_exit == false){
        await dfs_recur([x+1,y], exit_pos, visited)
    }
    next_pos = [x-1,y].toString()
    if (visited.has(next_pos) != true && found_exit == false){
        await dfs_recur([x-1,y], exit_pos, visited)
    }
    next_pos = [x,y+1].toString()
    if (visited.has(next_pos) != true && found_exit == false){
        await dfs_recur([x,y+1], exit_pos, visited)
    }
    next_pos = [x,y-1].toString()
    if (visited.has(next_pos) != true && found_exit == false){
        await dfs_recur([x,y-1], exit_pos, visited)
    }

}
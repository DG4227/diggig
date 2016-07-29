const Artist = (function() { 


	return class Artist{
		// getting from both bandsintown and spotify; need id for top tracks
		constructor(name, events, topTracks, picture)
	}
})












// const Task = (function() { 

// 	return class Task {
// 		constructor(description, priority, list) { 
// 			this.description = description;
// 			this.priority = priority;
// 			this.list = list;
// 			this.list.tasks.push(this);
// 			this.id = (this.list.tasks.length - 1);
// 		}

// 		liEl(){
// 			var str = `<li data-id="${this.id}"><button class="destroy-task">x</button> ${this.description}, ${this.priority}</li>`
//       return str
// 		}

// 		build(){
// 			$('#lists').append(this.listEl())
//     	$('#select_list').append(this.optionEl())
// 		}
// 	}
// }())
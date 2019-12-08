Array.prototype.chunk = function(groupsize){
    var sets = [], chunks, i = 0;
    chunks = Math.ceil(this.length / groupsize);

    while(i < chunks){
        sets[i] = this.splice(0, groupsize);
	i++;
    }
    return sets;
};
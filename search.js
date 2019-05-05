$(document).ready(function(){
    $('#search').keyup(function(){
        var searchValue = ($('#search').val()).trim();
        
        if(searchValue != '' && event.keyCode == 13) {
            $.getJSON('list.json', function(result){
                var list = result.list;
                var options = {
                    shouldSort: true,
                    tokenize: true,
                    findAllMatches: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [{
                        name: 'title',
                        weight: 0.3
                      }, {
                        name: 'desc.shortdesc',
                        weight: 0.7
                      }]
                };
                $('#results').empty();
                $('#results').append('<div class="mx-auto" id="it"><h5>The similar solutions are ..</h5></div>');
                var fuse = new Fuse(list, options);
                var searchResult = fuse.search(searchValue); 
                if(searchResult.length > 0) {
                    if(searchResult[0].cad != '')
                        {$('#results').append('<div class="fres"><center><model-viewer src="'+searchResult[0].cad+'"  background-color="#ffffff" shadow-intensity="1" camera-controls auto-rotate ar></model-viewer><br/>'+searchResult[0].title+'<br/></center><br/>'+searchResult[i].desc.shortdesc+'</div>')}
                    else
                        {$('#results').append('<div class="fres"><center><model-viewer src="paridhi.glb"  background-color="#ffffff" camera-controls auto-rotate ar></model-viewer><br/><h5>No CAD Models found</h5><br/>'+searchResult[0].title+'<br/></center><br/>'+searchResult[i].desc.shortdesc+'</div>')}

                    for(i=0; i < searchResult.length; i++) {
                        
                        $('#results').append('<div class="res"><br/><h3><a href="'+searchResult[i].link+'" style="text-decoration: none;">'+searchResult[i].title+'</a></h3><p>'+searchResult[i].desc.shortdesc+'</p><img width=100px height=100px src="'+searchResult[i].img+'"><br/></div>')
                    }
                }
                else {
                    $('#results').empty();
                    $('#results').html('No Results found.')
                }
            })
        }
    })
})
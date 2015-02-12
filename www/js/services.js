

angular.module('services', [])
// DB wrapper
.factory('DBA', function($cordovaSQLite) {
  var self = this;
 
  // Handle query's and potential errors
  self.query = function(query, parameters) {
    return $cordovaSQLite.execute(db, query, parameters)
      .then(function(result) {
        return result;
      }, function (error) {
        console.log('I found an error');
        console.log(error);
        return error;
      });
  }
 
  // Proces a result set
  self.getAll = function(result) {
    var output = [];
 
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
 
  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }
 
  return self;
})

// Resource service example
.factory('MyApp', function($cordovaSQLite, DBA) {
    var self = this;
    
    self.all = function() {
        return DBA.query('SELECT * FROM Classes')
        .then(function(result){
        	return DBA.getAll(result);
      });
    };

  self.save =function(currentClass){
      return DBA.query('insert into Classes (Name) values (?)', 
        [currentClass.Name]);
    };

    return self;
});
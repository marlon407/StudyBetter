

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
.factory('ClassRepository', function($cordovaSQLite, DBA) {
    var self = this;
    
    self.all = function() {
        return DBA.query('SELECT * FROM Classes')
        .then(function(result){
        	return DBA.getAll(result);
      });
    };

    self.getById = function(id) {
      var parameters = [id];
        return DBA.query('SELECT * FROM Classes WHERE ClassId = ?', parameters)
        .then(function(result) {
          return DBA.getById(result);
      });
    };

    self.save =function(currentClass){
      return DBA.query('insert into Classes (Name, MinimumPercentage) values (?, ?)', 
        [currentClass.Name, currentClass.MinimumPercentage]);
    };

    return self;
})


// Resource service example
.factory('AvaliationRepository', function($cordovaSQLite, DBA) {
    var self = this;
    
    self.all = function(id) {
      var parameters = [id];
        return DBA.query('SELECT * FROM Avaliations where ClassId = ?', parameters)
        .then(function(result){
          return DBA.getAll(result);
      });
    };

    self.getById = function(id) {
      var parameters = [id];
        return DBA.query('SELECT * FROM Avaliations WHERE AvaliationId = ?', parameters)
        .then(function(result) {
          return DBA.getById(result);
      });
    };

    self.getMiniumFromClass = function(id) {
      var parameters = [id];
        return DBA.query('SELECT MinimumPercentage FROM Classes WHERE ClassId = ?', parameters)
        .then(function(result) {
          return DBA.getById(result);
      });
    };

    self.save =function(aval){
      return DBA.query('insert into Avaliations (Description, ClassId, Worth, Grade, Data, Difficult) values (?,?,?,?,?,?)', 
        [aval.Description, aval.ClassId, aval.Worth, aval.Grade, aval.Data,aval.Difficult]);
    };

    self.update = function(aval) {
      var parameters = [aval.Description, aval.ClassId, aval.Worth, aval.Grade, aval.Data, aval.Difficult, aval.AvaliationId];
      return DBA.query("UPDATE Avaliations SET Description = (?), ClassId = (?), Worth = (?), Grade = (?), Data = (?), Difficult = (?) WHERE AvaliationId = (?)", parameters);
    }

    self.remove = function(id) {
      var parameters = [id];
      return DBA.query("DELETE FROM Avaliations WHERE AvaliationId = (?)", parameters);
    }

    return self;
});
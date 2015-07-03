var module = angular.module('app', []);

module.service('ContactService', function(){
	var uid = 1;

	var contacts = [
					{ id: 0, name: 'Andy', email: "hello@gmail.com", phone: '123-456'}
				   ];

	this.get = function(id){
		for(index in contacts){
			if(contacts[index].id == id){
				return contacts[index];
			}
		}
	}

	this.save = function(contact){
		if(_.isEmpty(contact)){
			alert("Cannot store empty entry");
		}
		else{
			if(contact.id == null){
				contact.id = uid++;
				contacts.push(contact);
			}
			/* edit existing contact */
			else{
				
				for(index in contacts){
					if(contacts[index].id == contact.id){
						contacts[index] = contact;
					}
				}
			}
		}
	}

	this.delete = function(id){
		for(index in contacts){
			if(contacts[index].id == id){
				contacts.splice(index, 1);
			}
		}
	}
	this.list = function(){
		return contacts;
	}
});


module.controller('ContactController', function($scope, ContactService){
	$scope.contacts = ContactService.list();

	$scope.saveContact = function(){
		ContactService.save($scope.newcontact);
		$scope.newcontact = {};
	}

	$scope.edit = function(id){
		$scope.newcontact = angular.copy(ContactService.get(id));
	}

	$scope.delete = function(id){
		ContactService.delete(id);
		if($scope.newcontact.id == id){
			$scope.newcontact = {};
		}
	}
});
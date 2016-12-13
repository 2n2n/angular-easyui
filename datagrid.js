/**
 *	author: anthony.ras
 *  date: 12/13/2016
 *  description: angular datagrid factory.
**/
angular.module('angular.easyUi',[])
.factory('easyui.datagrid', ['$q',function($q) {
	return {
		datagridCollection: [],
		create: function(namespace, el, options) {
			try {
				if( typeof namespace === 'undefined' || !(typeof namespace  === 'string' && namespace.length > 0) ) throw "Invalid datagrid namespace.";
				// override defaults.
				var promise = $q.defer();

				options = $.extend({} ,{
					pagination: true,
					pageList: [10, 20, 30, 40, 50, 100, 400],
					pageSize: 20,
					onLoadSuccess: function(data) {
						promise.resolve(data);		
					}
				}, options);

				// initiate the datagrid
				el.datagrid(options);
				this.datagridCollection.push({ name: namespace, datagrid: el });
				return promise.promise;
			}
			catch (err)
			{
				console.error(err);
			}
		},
		delete: function(key) {
			delete this.datagridCollection[key];
		},
		clear: function() {
			this.datagridCollection = [];
		},
		get: function(key) {

			var found = this.datagridCollection.filter(function(elem) {
				return elem.name === key;
			});

			return found.length < 1 ? undefined : found[0].datagrid;
		}
	}
}])
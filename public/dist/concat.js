/**
 * Created by danielsilhavy on 01.08.16.
 */

var App = {
    controller: {},
    models: {},
    views : {},
    utils: {},
    constants: {},
    handler: {}
};
/**
 * Created by danielsilhavy on 02.08.16.
 */
App.handler.Errorhandler = function () {
};

App.handler.Errorhandler.handleError = function (error) {
    var q = Q.defer();

    if(error.responseText) {
        App.handler.Errorhandler.handleHTTPError(error);
    } else {
        App.handler.Errorhandler.handleInputError(error);
    }

    return q.promise;
};

App.handler.Errorhandler.handleHTTPError = function (error) {
    var message;
    var loginModel = App.models.LoginModel.getInstance();

    switch(error.status) {
        case 400:
            message = error.responseJSON.err.message;
            break;
        case 401:
            message = error.responseJSON.err.message;
            break;
        default:
            message = 'An error occured';
    }
    App.views.MessageView.renderErrorMessage({message:message});
    if(message === 'jwt expired') {
        loginModel.logoutUser();
    }
};

App.handler.Errorhandler.handleInputError = function (error) {
    var message = error.message || 'An error occured';

    App.views.MessageView.renderErrorMessage({message:message});
};
/**
 * Created by danielsilhavy on 01.08.16.
 */
var BASE_URL = 'http://127.0.0.1:3000/v1/';

App.constants.requestParameter = {
    attribute: {
        GET: BASE_URL + 'attributes',
        CREATE: BASE_URL + 'myattributes',
        EDIT: BASE_URL + 'attributes',
        DELETE: BASE_URL + 'attributes',
        GET_MULTI: BASE_URL + 'attributes',
        MYLIST: BASE_URL + 'myattributes',
    },

    attribute_template: {
        LIST: 'template/attribute/list.html',
        CREATE: 'template/attribute/create.html',
        EDIT: 'template/attribute/edit.html',
        MYLIST: 'template/attribute/mylist.html',
    },

    featureGroup: {
        GET: BASE_URL + 'featuregroups',
        CREATE: BASE_URL + 'myfeaturegroups',
        EDIT: BASE_URL + 'featuregroups',
        DELETE: BASE_URL + 'featuregroups',
        GET_MULTI: BASE_URL + 'featuregroups',
        MYLIST: BASE_URL + 'myfeaturegroups',
    },

    featureGroup_template: {
        LIST: 'template/featuregroup/list.html',
        CREATE: 'template/featuregroup/create.html',
        EDIT: 'template/featuregroup/edit.html',
        MYLIST: 'template/featuregroup/mylist.html',
        DETAILS: 'template/featuregroup/details.html',
    },
    feature: {
        GET: BASE_URL + 'features',
        CREATE: BASE_URL + 'myfeatures',
        EDIT: BASE_URL + 'features',
        DELETE: BASE_URL + 'features',
        GET_MULTI: BASE_URL + 'features',
        MYLIST: BASE_URL + 'myfeatures',
    },

    feature_template: {
        LIST: 'template/feature/list.html',
        CREATE: 'template/feature/create.html',
        EDIT: 'template/feature/edit.html',
        MYLIST: 'template/feature/mylist.html',
        DETAILS: 'template/feature/details.html',
    },
    testcase: {
        GET: BASE_URL + 'testcases',
        CREATE: BASE_URL + 'mytestcases',
        EDIT: BASE_URL + 'testcases',
        DELETE: BASE_URL + 'testcases',
        GET_MULTI: BASE_URL + 'testcases',
        MYLIST: BASE_URL + 'mytestcases',
    },

    testcase_template: {
        LIST: 'template/testcase/list.html',
        CREATE: 'template/testcase/create.html',
        EDIT: 'template/testcase/edit.html',
        MYLIST: 'template/testcase/mylist.html',
        DETAILS: 'template/testcase/details.html',
    },
    testvector: {
        GET: BASE_URL + 'testvectors',
        CREATE: BASE_URL + 'mytestvectors',
        EDIT: BASE_URL + 'testvectors',
        DELETE: BASE_URL + 'testvectors',
        GET_MULTI: BASE_URL + 'testvectors',
        MYLIST: BASE_URL + 'mytestvectors',
        GROUPED_LIST: BASE_URL + 'testvectors/groupedlist',
    },

    testvector_template: {
        LIST: 'template/testvector/list.html',
        CREATE: 'template/testvector/create.html',
        EDIT: 'template/testvector/edit.html',
        MYLIST: 'template/testvector/mylist.html',
        GROUPED_LIST: 'template/testvector/groupedList.html',
        DETAILS: 'template/testvector/details.html',
    },

    user: {
        GET: BASE_URL + 'users',
        CREATE: BASE_URL + 'users',
        EDIT: BASE_URL + 'users',
        DELETE: BASE_URL + 'users',
        GET_MULTI: BASE_URL + 'users',
    },

    user_template: {
        LIST: 'template/user/list.html',
        CREATE: 'template/user/create.html',
        EDIT: 'template/user/edit.html',
    },

    default_template: {
        INDEX: 'template/default/index.html',
        FAQ: 'template/default/faq.html',
        DISCLAIMER: 'template/default/disclaimer.html'
    },

    statistic: {
        SIZE: BASE_URL + 'statistics/size',
        TESTVECTOR_TYPES: BASE_URL + 'statistics/testvector/types',
        TESTCASE_TYPES: BASE_URL + 'statistics/testcase/types',
        FEATURE_TYPES: BASE_URL + 'statistics/feature/types',
        FEATUREGROUP_TYPES: BASE_URL + 'statistics/featuregroup/types'
    },

    LOGIN_USER: BASE_URL + 'users/login',
    LOGIN_TEMPLATE: 'template/login/login.html',
    ERROR_TEMPLATE: 'template/notifications/error.html',
    SUCCESS_TEMPLATE: 'template/notifications/success.html'
};

App.constants.targetContainer = '#mainContainer';
App.constants.messageContainer = '#messageContainer';

App.constants.events = {
    attribute: {
        CREATE: 'createAttribute',
        DELETE: 'deleteAttribute',
        EDIT: 'editAttribute',
    },
    featureGroup: {
        CREATE: 'createFeatureGroup',
        DELETE: 'deleteFeatureGroup',
        EDIT: 'editFeatureGroup',
        TOGGLE_COLUMN: 'toggleColumnFeatureGroup'
    },
    feature: {
        CREATE: 'createFeature',
        DELETE: 'deleteFeature',
        EDIT: 'editFeature',
        TOGGLE_COLUMN: 'toggleColumnFeature'
    },
    testcase: {
        CREATE: 'createTestcase',
        DELETE: 'deleteTestcase',
        EDIT: 'editTestcase',
        TOGGLE_COLUMN: 'toggleColumnTestcase'
    },
    testvector: {
        CREATE: 'createTestvector',
        DELETE: 'deleteTestvector',
        EDIT: 'editTestvector',
        TOGGLE_COLUMN: 'toggleColumnTestvector'
    },
    user: {
        CREATE: 'createUser',
        DELETE: 'deleteUser',
        EDIT: 'editUser',
    },
    LOGIN: 'login',
    DISCLAIMER: 'disclaimer'
};

App.constants.types = {
    FEATURE: 'Feature',
    FEATURE_GROUP: 'Feature Group',
    TESTCASE: 'Testcase',
    TESTVECTOR: 'Testvector'
};

App.constants.pagination = {
    LIMIT: 25
};
/**
 * Created by danielsilhavy on 01.08.16.
 */


App.utils.HTTPUtils = {};

App.utils.HTTPUtils.get = function (url,token) {
    var q = Q.defer();

    $.ajax({
        method: "GET",
        url: url,
        timeout: 10000,
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.post = function (url, params, token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "POST",
        url: url,
        type: 'json',
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify(params),
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.put = function (url,params,token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "PUT",
        url: url,
        type: 'json',
        contentType: 'application/json',
        timeout: 10000,
        data: JSON.stringify(params),
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.utils.HTTPUtils.delete = function (url,token) {
    var q = Q.defer();
    token = token || null;

    $.ajax({
        method: "DELETE",
        url: url,
        timeout: 10000,
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        }
    })
      .done(function (data) {
          q.resolve(data);

      })
      .fail(function (error) {
          q.reject(error);
      });

    return q.promise;
};



/**
 * Created by danielsilhavy on 01.08.16.
*/

App.views.MessageView = function () {

};

App.views.MessageView.renderSuccessMessage = function (message) {
    alertify.success(message.message);
};

App.views.MessageView.renderErrorMessage = function (message) {
    alertify.error(message.message);
};


/**
 * Created by danielsilhavy on 01.08.16.
 */

var $BODY = $('body'),
  $SIDEBAR_FOOTER = $('.sidebar-footer'),
  $LEFT_COL = $('.left_col'),
  $RIGHT_COL = $('.right_col'),
  $NAV_MENU = $('.nav_menu'),
  $FOOTER = $('footer');

App.views.MainView = function (type) {
    this.type = type;
};


App.views.MainView.prototype.renderList = function (data, filterPreferences) {
    var self = this;
    data.printableElems = [];

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].LIST)
      .then(function (templateData) {
          data = self.getPrintableAttributes(data);
          data.printableElems = self.formatDate(data.printableElems);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 0);
      });
};

App.views.MainView.prototype.renderMyList = function (data, filterPreferences) {
    var self = this;

    data.printableElems = [];
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].MYLIST)
      .then(function (templateData) {
          data = self.getPrintableAttributes(data);
          data.printableElems = self.formatDate(data.printableElems);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 1);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.views.MainView.prototype.renderCreate = function (data) {
    var q = Q.defer();
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].CREATE)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          $('#create-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].CREATE, this, self.getFieldValues());
              return false;
          });
          q.resolve();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });

    return q.promise;
};

App.views.MainView.prototype.renderEdit = function (data) {
    var q = Q.defer();
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].EDIT)
      .then(function (templateData) {
          self.registerHandlebarsSelectHelper();
          self.renderHandlebars(templateData, data);
          $('#edit-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].EDIT, this, self.getEditFieldValues());
              return false;
          });
          q.resolve();
      });

    return q.promise;
};

App.views.MainView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.MainView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};

/**
 * Override this abstract method
 */
App.views.MainView.prototype.getFieldValues = function () {

};
/**
 * Override this abstract method
 */
App.views.MainView.prototype.getEditFieldValues = function () {

};

App.views.MainView.prototype.renderHandlebars = function (templateData, data) {
    var template = Handlebars.compile(templateData);

    data = data || [];
    this.render(template(data));
};

App.views.MainView.prototype.renderLoadingAnimation = function () {
    this.render('<div class="row" style="margin-top: 200px"><div class="col-sm-4 col-sm-offset-5"><img src="img/loading.svg"></div></div>');
};

App.views.MainView.prototype.renderDisclaimer = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.DISCLAIMER)
      .then(function (templateData) {
          self.renderHandlebars(templateData);
          $('#disclaimer-agree-button').bind('click', function () {
              EventBus.dispatch(App.constants.events.DISCLAIMER, this, true);
          });
      });

};

App.views.MainView.prototype.render = function (html) {
    $(App.constants.targetContainer).html(html);
    this.setContentHeight();
};

App.views.MainView.prototype.setContentHeight = function () {
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
};


App.views.MainView.prototype.toggleMenuState = function (loginData) {
    var link = $('#login-menu-link');
    var role = null;

    // Show respective menu items
    if (!loginData) {
        link.html('Login');
        link.attr('href', '#login');
        $('.member').hide();
        $('.admin').hide();
    } else {
        role = loginData.roles[0] || '';
        link.html('Logout');
        link.attr('href', '#logout');
        if (role === 'member') {
            $('.member').show();
            $('.admin').hide();
        }
        else if (role === 'admin' || role === 'superuser') {
            $('.member').show();
            $('.admin').show();
        }
    }
};

App.views.MainView.prototype.setActiveItem = function (route) {
    var type = route[0] || '';
    var action = route[1] || '';

    $('li').removeClass('current-page');
    $('a[href$="' + type + '/' + action + '"]').parent().addClass('current-page');
};

App.views.MainView.prototype.clearView = function () {
    $(App.constants.messageContainer).html('');
    $(App.constants.targetContainer).html('');
};

App.views.MainView.prototype.createDatatableFilters = function (id) {
    // Setup - add a text input to each footer cell
    $('#' + id + ' tfoot th').each(function () {
        var title = $(this).text();
        $(this).html(title + '<input type="text" placeholder="Search" />');
    });

    // Create the column selection
    $('#filter_columns').append('<select id="select-column-filter" class="selectpicker" data-actions-box="true" multiple data-live-search="true"> </select>');
    $('#' + id + ' thead th').each(function (index) {
        var title = $(this).text();
        $('#select-column-filter').append('<option selected class="toggle-vis" uiName="' + title + '" data-column="' + index + '" >' + title + ' </option> ');
    });
};

App.views.MainView.prototype.addDatatablesSelect = function (table) {
    var self = this;

    $('#select-column-filter').on('changed.bs.select', function (e, clickedIndex, newValue) {
        var column;
        var visible = true;
        var attributes = [];
        var targets;

        if (typeof clickedIndex !== 'undefined') {
            column = table.column(clickedIndex);
            attributes.push({
                name: $('#select-column-filter option').eq(clickedIndex).attr('uiName'),
                selected: newValue
            });
            // Toggle the visibility
            column.visible(!column.visible());
        } else {
            // hide or show multiple columns
            targets = e.target || [];
            $.each(targets, function (index, item) {
                column = table.column(index);
                visible = item.selected;
                column.visible(visible);
                attributes.push({name: item.attributes.uiName.value, selected: visible});
            });
        }
        // Inform the controller that an item has been toggled
        EventBus.dispatch(App.constants.events[self.type].TOGGLE_COLUMN, self, {
            type: self.type,
            attributes: attributes
        });

    });

    table.buttons().container()
      .appendTo('#example_wrapper .col-sm-6:eq(0)');
};

App.views.MainView.prototype.addDatatablesSearch = function (table, data, filterPreferences) {
    var self = this;

    table.columns().every(function (index) {
        var that = this;
        var header = this.header();
        var currentColumn;
        var shownByDefault = true;
        var found = false;
        var i = 0;
        var item;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                  .search(this.value)
                  .draw();
            }
        });

        currentColumn = header.innerText;
        data.attributes = data.attributes || [];
        while (!found && i < data.attributes.length) {
            item = data.attributes[i];
            if (item.type.toLowerCase() === self.type && item.uiName === currentColumn) {
                shownByDefault = item.shownByDefault;
                found = true;
            }
            i++;
        }

        if ((filterPreferences[self.type] && filterPreferences[self.type][currentColumn] === false) || (!shownByDefault && (!filterPreferences || !filterPreferences[self.type] || !filterPreferences[self.type][currentColumn]))) {
            that.visible(false);
            $('#select-column-filter option').eq(index).prop('selected', false);
        }

    });
    $('.selectpicker').selectpicker();
};

App.views.MainView.prototype.initializeDataTable = function (id, data, filterPreferences, columnToOrderBy) {
    var self = this;
    var button;

    columnToOrderBy = columnToOrderBy || 0;
    self.createDatatableFilters(id);
    // DataTable
    var table = $('#' + id).DataTable({
        pageLength: 50,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        scrollX: true,
        order: [[columnToOrderBy, 'asc']],
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'copy', 'csv', 'excel'
        ],
        drawCallback: function () {
            $('.delete-button').on('click', function () {
                button = this;
                alertify.confirm('Delete an element', 'Are you sure you want to delete the element?', function () {
                    EventBus.dispatch(App.constants.events[self.type].DELETE, self, self.getIdFromButton(button));
                }, function () {
                    alertify.error('Canceled');
                });
            });
        }
    });

    self.addDatatablesSelect(table);
    self.addDatatablesSearch(table, data, filterPreferences);
    self.setContentHeight();
};

App.views.MainView.prototype.setRoute = function (route) {
    window.location.hash = route;
};


App.views.MainView.prototype.registerHandlebarsSelectHelper = function () {
    Handlebars.registerHelper("select", function (value, options) {
        return options.fn(this)
          .split('\n')
          .map(function (v) {
              var t = 'value="' + value + '"';
              return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"');
          })
          .join('\n');
    });
};

App.views.MainView.prototype.getPrintableAttributes = function (data) {
    var current;
    var currentAttribute;

    // copy the properties of each item
    data.entries.forEach(function (entry) {
        current = {};
        for (var property in entry) {
            if (entry.hasOwnProperty(property) && property !== 'attributes') {
                current[property] = entry[property];
            }
        }
        current.attributes = [];
        // check if the current entry has this Attribute otherwise set it to empty string
        data.attributes.forEach(function (attribute) {
            currentAttribute = {'attribute': attribute, 'value': 'Undefined'};
            entry.attributeInstances.forEach(function (attributeInstance) {
                if (attribute._id === attributeInstance.attribute._id) {
                    currentAttribute.value = attributeInstance.value;
                }
            });
            current.attributes.push(currentAttribute);
        });
        data.printableElems.push(current);
    });
    return data;
};

App.views.MainView.prototype.resizeChart = function (chart) {
    $(window).on('resize', function () {
        if (chart !== null && chart !== undefined) {
            chart.resize();
        }
    });
};

App.views.MainView.prototype.formatDate = function (entries) {
    var date;

    entries.map(function (item) {
        if (item.hasOwnProperty('createdAt')) {
            date = new Date(item.createdAt);
            item.createdAt = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
        if (item.hasOwnProperty('updatedAt')) {
            date = new Date(item.updatedAt);
            item.updatedAt = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
    });
    return entries;
};



/**
 * Created by danielsilhavy on 02.08.16.
 */
App.views.AttributeView = function () {
    App.views.MainView.call(this, 'attribute');
};

App.views.AttributeView.prototype = new App.views.MainView();
App.views.AttributeView.prototype.constructor = App.views.AttributeView;


App.views.AttributeView.prototype.renderList = function (data, filterPreferences) {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].LIST)
      .then(function (templateData) {
          data.entries = self.formatDate(data.entries);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 0);
      });
};

App.views.AttributeView.prototype.renderMyList = function (data, filterPreferences) {
    var self = this;
    var button;

    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].MYLIST)
      .then(function (templateData) {
          data.entries = self.formatDate(data.entries);
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences, 1);
          $('.delete-button').on('click', function () {
              button = this;
              alertify.confirm('Delete an element', 'Are you sure you want to delete the element?', function () {
                  EventBus.dispatch(App.constants.events[self.type].DELETE, self, self.getIdFromButton(button));
              }, function () {
                  alertify.error('Canceled');
              });
          });
      });
};


App.views.AttributeView.prototype.getFieldValues = function () {
    var values = {};

    values.description = $('#description').val();
    values.uiName = $('#ui-name').val();
    values.type = $("#type-select option:selected").val();
    values.active = $('input[name=active]:checked').val();
    values.shownByDefault = $('input[name=shown-by-default]:checked').val();
    values.defaultValue = $('#default-value').val();
    values.deletable = $('input[name=deletable]:checked').val();
    values.active = values.active === 'true';
    values.deletable = values.deletable === 'true';
    values.shownByDefault = values.shownByDefault === 'true';
    return values;
};

App.views.AttributeView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.description = $('#description').val();
    values.uiName = $('#ui-name').val();
    values.type = $("#type-select option:selected").val();
    values.active = $('input[name=active]:checked').val();
    values.shownByDefault = $('input[name=shown-by-default]:checked').val();
    values.defaultValue = $('#default-value').val();
    values.deletable = $('input[name=deletable]:checked').val();
    values.active = values.active === 'true';
    values.deletable = values.deletable === 'true';
    values.shownByDefault = values.shownByDefault === 'true';
    values.id = self.getIdFromHiddenField();
    return values;
};

App.views.AttributeView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.AttributeView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};


/**
 * Created by danielsilhavy on 04.08.16.
 */

App.views.DefaultView = function () {
    App.views.MainView.call(this, 'default');
};

App.views.DefaultView.prototype = new App.views.MainView();
App.views.DefaultView.prototype.constructor = App.views.DefaultView;

App.views.DefaultView.prototype.renderIndex = function (data) {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.INDEX)
      .then(function (templateData) {
          data = self.setActivities(data);
          self.renderHandlebars(templateData, data);
          self.createDonutTc(data.testcaseTypes);
          self.createDonutTv(data.testvectorTypes);
          self.createDonutF(data.featureTypes);
          self.createDonutTvTcF(data.testvectorTypes);
      })
      .catch(function (err) {
          throw new Error(err);
      });
};

App.views.DefaultView.prototype.renderFAQ = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.default_template.FAQ)
      .then(function (templateData) {
          self.renderHandlebars(templateData);
      });
};

App.views.DefaultView.prototype.setActivities = function (data) {
    var additions = [];
    var updates = [];
    var self = this;

    data.testvectorTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Testvector', additions, updates);
    });
    data.testcaseTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Testcase', additions, updates);
    });
    data.featureTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Feature', additions, updates);
    });
    data.featureGroupTypes.forEach(function (elem) {
        self.createActivityEntry(elem, 'Feature Group', additions, updates);
    });
    data.additions = additions.sort(this.sortByDate).slice(0, 5);
    data.updates = updates.sort(this.sortByDate).slice(0, 5);
    return data;
};

App.views.DefaultView.prototype.createActivityEntry = function (elem, type, additions, updates) {
    var createdAt = new Date(1970, 1, 1);
    var updatedAt = new Date(1970, 1, 1);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var urlTypes = {
        'Feature Group': 'featuregroup',
        'Feature': 'feature',
        'Testcase': 'testcase',
        'Testvector': 'testvector'
    };
    var detailsUrl = '#' + urlTypes[type] + '/details/' + elem._id;

    if (elem.createdAt) {
        createdAt = new Date(elem.createdAt);
    }
    if (elem.updatedAt) {
        updatedAt = new Date(elem.updatedAt);
    }
    additions.push({
        type: type,
        date: {full: createdAt, month: months[createdAt.getMonth()], day: createdAt.getDate()},
        name: elem.name,
        detailsUrl: detailsUrl
    });
    updates.push({
        type: type,
        date: {full: updatedAt, month: months[updatedAt.getMonth()], day: updatedAt.getDate()},
        name: elem.name,
        detailsUrl: detailsUrl
    });
};


App.views.DefaultView.prototype.sortByDate = function (a, b) {
    return new Date(b.date.full) - new Date(a.date.full);
};

App.views.DefaultView.prototype.createDonutF = function (data) {
    var currentFeatureGroups = [];
    var featureGroups = [];
    var featureGroupNames = [];
    var myChart = echarts.init(document.getElementById('donutF'));

    data = data || [];
    data.forEach(function (item) {
        if (!currentFeatureGroups[item.featureGroup._id]) {
            currentFeatureGroups[item.featureGroup._id] = {
                value: 1,
                name: item.featureGroup.name
            };
        } else {
            currentFeatureGroups[item.featureGroup._id].value += 1;
        }
    });


    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroupNames.push(currentFeatureGroups[fg].name);
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: featureGroupNames
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        calculable: true,
        series: [{
            name: 'Features per Feature Group',
            type: 'pie',
            radius: [25, 90],
            center: ['50%', 170],
            roseType: 'area',
            x: '50%',
            max: 40,
            sort: 'ascending',
            data: featureGroups,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                }
            },
        }]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTc = function (data) {
    var currentFeatureGroups = [];
    var currentFeatures = [];
    var features = [];
    var featureGroups = [];
    var myChart = echarts.init(document.getElementById('donutTc'));

    data = data || [];
    data.forEach(function (item) {
        if (!currentFeatures[item.feature._id]) {
            currentFeatures[item.feature._id] = {
                value: 1,
                name: item.feature.name
            };
        } else {
            currentFeatures[item.feature._id].value += 1;
        }
        if (!currentFeatureGroups[item.feature.featureGroup._id]) {
            currentFeatureGroups[item.feature.featureGroup._id] = {
                value: 1,
                name: item.feature.featureGroup.name
            };
        } else {
            currentFeatureGroups[item.feature.featureGroup._id].value += 1;
        }
    });


    for (var f in currentFeatures) {
        if (currentFeatures.hasOwnProperty(f)) {
            features.push(currentFeatures[f]);
        }
    }
    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data: featureGroups
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Feature Group',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },
                data: featureGroups
            },
            {
                name: 'Feature',
                type: 'pie',
                radius: [100, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                data: features
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTv = function (data) {
    var currentFeatureGroups = [];
    var currentFeatures = [];
    var features = [];
    var featureGroups = [];
    var myChart = echarts.init(document.getElementById('donutTv'));

    data = data || [];
    data.forEach(function (item) {
        item.testcases.forEach(function (tc) {
            if (!currentFeatures[tc.feature._id]) {
                currentFeatures[tc.feature._id] = {
                    value: 1,
                    name: tc.feature.name
                };
            } else {
                currentFeatures[tc.feature._id].value += 1;
            }
            if (!currentFeatureGroups[tc.feature.featureGroup._id]) {
                currentFeatureGroups[tc.feature.featureGroup._id] = {
                    value: 1,
                    name: tc.feature.featureGroup.name
                };
            } else {
                currentFeatureGroups[tc.feature.featureGroup._id].value += 1;
            }
        });
    });

    for (var f in currentFeatures) {
        if (currentFeatures.hasOwnProperty(f)) {
            features.push(currentFeatures[f]);
        }
    }
    for (var fg in currentFeatureGroups) {
        if (currentFeatureGroups.hasOwnProperty(fg)) {
            featureGroups.push(currentFeatureGroups[fg]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data: featureGroups
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Feature Group',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },
                data: featureGroups
            },
            {
                name: 'Feature',
                type: 'pie',
                radius: [100, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                data: features
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.DefaultView.prototype.createDonutTvTcF = function (data) {
    var currentTestcases = [];
    var testcases = [];
    var myChart = echarts.init(document.getElementById('donutTvTcF'));

    data = data || [];
    data.forEach(function (item) {
        item.testcases.forEach(function (tc) {
            if (!currentTestcases[tc._id]) {
                currentTestcases[tc._id] = {
                    value: 1,
                    name: tc.name + '(' + tc.feature.name + ')'
                };
            } else {
                currentTestcases[tc._id].value += 1;
            }
        });
    });

    for (var tc in currentTestcases) {
        if (currentTestcases.hasOwnProperty(tc)) {
            testcases.push(currentTestcases[tc]);
        }
    }

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Testcase (Feature) ',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,

                data: testcases
            },
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);

};






/**
 * Created by danielsilhavy on 02.08.16.
 */

App.views.FeatureGroupView = function () {
    App.views.MainView.call(this, 'featureGroup');
};

App.views.FeatureGroupView.prototype = new App.views.MainView();
App.views.FeatureGroupView.prototype.constructor = App.views.FeatureGroupView;


App.views.FeatureGroupView.prototype.renderDetails = function (data) {
    var self = this;

    data.featureGroup = self.formatDate([data.featureGroup])[0];
    data.features = self.formatDate(data.features);
    data.testcases = self.formatDate(data.testcases);
    data.testvectors = self.formatDate(data.testvectors);
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].DETAILS)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.renderTestvectorChart(data.testvectors);
      });
};

App.views.FeatureGroupView.prototype.renderTestvectorChart = function (data) {
    var currentFeatures = [];
    var features = [];
    var myChart = echarts.init(document.getElementById('chart'));

    data = data || [];
    data.forEach(function (item) {
        item.testcases.forEach(function (tc) {
            if (!currentFeatures[tc.feature._id]) {
                currentFeatures[tc.feature._id] = {
                    value: 1,
                    name: tc.feature.name
                };
            } else {
                currentFeatures[tc.feature._id].value += 1;
            }
        });
    });

    for (var f in currentFeatures) {
        if (currentFeatures.hasOwnProperty(f)) {
            features.push(currentFeatures[f]);
        }
    }

    var option = {
        title: {
            text: 'Testvectors per Feature',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: features
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Feature',
                type: 'pie',
                radius: [0, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },

                data: features
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.FeatureGroupView.prototype.getFieldValues = function () {
    var values = {};

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            attribute: obj.attributes['attribute-id'].value
        });
    });
    return values;
};


App.views.FeatureGroupView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            '_id': obj.attributes['attribute-instance-id'].value
        });
    });
    values.id = self.getIdFromHiddenField();

    return values;
};




/**
 * Created by danielsilhavy on 04.08.16.
 */

App.views.FeatureView = function () {
    App.views.MainView.call(this,'feature');
};

App.views.FeatureView.prototype = new App.views.MainView();
App.views.FeatureView.prototype.constructor = App.views.FeatureView;

App.views.FeatureView.prototype.renderDetails = function (data) {
    var self = this;

    data.feature = self.formatDate([data.feature])[0];
    data.testcases = self.formatDate(data.testcases);
    data.testvectors = self.formatDate(data.testvectors);
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].DETAILS)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.renderTestvectorChart(data.testvectors);
      });
};

App.views.FeatureView.prototype.renderTestvectorChart = function (data) {
    var currentTestcases = [];
    var testcases = [];
    var myChart = echarts.init(document.getElementById('chart'));

    data = data || [];
    data.forEach(function (item) {
        item.testcases.forEach(function (tc) {
            if (!currentTestcases[tc._id]) {
                currentTestcases[tc._id] = {
                    value: 1,
                    name: tc.name
                };
            } else {
                currentTestcases[tc._id].value += 1;
            }
        });
    });

    for (var f in currentTestcases) {
        if (currentTestcases.hasOwnProperty(f)) {
            testcases.push(currentTestcases[f]);
        }
    }

    var option = {
        title: {
            text: 'Testvectors per Testcase',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: testcases
        },
        calculable: false,
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: "Save Image"
                }
            }
        },
        series: [
            {
                name: 'Testcase',
                type: 'pie',
                radius: [0, 140],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },

                data: testcases
            }
        ]
    };
    myChart.setOption(option);
    this.resizeChart(myChart);
};

App.views.FeatureView.prototype.getFieldValues = function () {
    var values = {};

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            attribute: obj.attributes['attribute-id'].value
        });
    });
    values.featureGroup = $( "#feature-group-select option:selected" ).val();
    return values;
};

App.views.FeatureView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            '_id': obj.attributes['attribute-instance-id'].value
        });
    });
    values.featureGroup = $( "#feature-group-select option:selected").val();
    values.id = self.getIdFromHiddenField();

    return values;
};

App.views.FeatureView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.FeatureView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};


/**
 * Created by danielsilhavy on 02.08.16.
 */
App.views.LoginView = function () {
    App.views.MainView.call(this,'login');
};

App.views.LoginView.prototype = new App.views.MainView();
App.views.LoginView.prototype.constructor = App.views.LoginView;

App.views.LoginView.prototype.renderLogin = function () {
    var self = this;

    App.utils.HTTPUtils.get(App.constants.requestParameter.LOGIN_TEMPLATE)
      .then(function (templateData) {
          self.renderHandlebars(templateData, null);
          // add Event Listener to the submit button
          $('#login-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events.LOGIN, this, self.getFieldValues());
              return false;
          });
      });
};

App.views.LoginView.prototype.getFieldValues = function () {
    var values = {};

    values.username = $('#username').val();
    values.password = $('#password').val();
    return values;
};




/**
 * Created by danielsilhavy on 04.08.16.
 */

App.views.TestcaseView = function () {
    App.views.MainView.call(this,'testcase');
};

App.views.TestcaseView.prototype = new App.views.MainView();
App.views.TestcaseView.prototype.constructor = App.views.FeatureGroupView;


App.views.TestcaseView.prototype.renderDetails = function (data) {
    var self = this;

    data.testcase = self.formatDate([data.testcase])[0];
    data.testvectors = self.formatDate(data.testvectors);
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].DETAILS)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
      });
};

App.views.TestcaseView.prototype.getFieldValues = function () {
    var values = {};

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            attribute: obj.attributes['attribute-id'].value
        });
    });
    values.feature = $( "#feature-select option:selected" ).val();
    return values;
};

App.views.TestcaseView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            '_id': obj.attributes['attribute-instance-id'].value
        });
    });
    values.feature = $( "#feature-select option:selected").val();
    values.id = self.getIdFromHiddenField();

    return values;
};




/**
 * Created by danielsilhavy on 04.08.16.
 */

var IMPORT_MAPPING = {
    'Dash Profile(s)': 'profile',
    'MPD type': 'mpd_type',
    '@minimumUpdatePeriod': 'min_update_period',
    '@timeShiftBufferDepth': 'time_shift_buffer_depth',
    'Num Periods': 'num_periods',
    'Total duration': 'duration',
    'max num. Video Repr.': 'max_num_video',
    'max num. Audio Repr.': 'max_num_audio',
    'Multi-resolution video': 'multi_resolution_video',
    'Max video resolution': 'max_video_resolution',
    'mimeType(s)': 'mime_types',
    'Video codecs': 'video_codec',
    'Audio codecs': 'audio_codec',
    'SegmentTemplate': 'segment_template',
    'SegmentTemplate$Number$': 'segment_template_number',
    'SegmentTemplate$Time$': 'segment_template_time',
    'SegmentTemplate@duration': 'segment_template_duration',
    'ContentProtection@schemeIdUri': 'content_protection_schemeid_uri',
    'EssentialProperty@schemeIdUri': 'essential_property_schemeid_uri',
    'UTCTiming@schemeIdUri': 'utc_timing_schemeid_uri',
    'InbandEventStream@schemeIdUri': 'inband_event_stream_schemeid_uri',
    'cenc:pssh': 'cenc_pssh',
    'Max num. BaseURL': 'max_num_base_url',
    'SegmentTemplate@presentationTimeOffset': 'segment_template_presentation_timeoffset',
    'SegmentBase@presentationTimeOffset': 'segment_base_presentation_timeoffset',
    'SupplementalProperty@schemeIdUri': 'supplemental_property_scheme_id_uri',
    'UTCTiming': 'utc_timing_schemeid_uri',
    'xlink:href': 'period_xlink_href',
    'xlink:actuate': 'period_xlink_actuate',
    'AssetIdentifier': 'asset_identifier',
    'Early Terminated period': 'early_terminated_period',
    'Default Content': 'default_content'
};


App.views.TestvectorView = function () {
    App.views.MainView.call(this, 'testvector');
};

App.views.TestvectorView.prototype = new App.views.MainView();
App.views.TestvectorView.prototype.constructor = App.views.TestvectorView;


App.views.TestvectorView.prototype.renderCreate = function (data) {
    var q = Q.defer();
    var self = this;

    data.features = self.getTestcasesByFeature(data.testcases);
    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].CREATE)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          $('#create-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].CREATE, this, self.getFieldValues());
              return false;
          });

          $('#import-attributes-button').bind('click', function () {
              self.importAttributes();
          });
          q.resolve();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });

    return q.promise;

};

App.views.TestvectorView.prototype.renderList = function (data, filterPreferences) {
    var self = this;
    var datatableOptions = {};
    var columns = [
        {data: 'testvector'},
        {data: 'featureGroup'},
        {data: 'feature'},
        {data: 'testcase'},
        {data: 'url'},
        {data: 'play'},
    ];
    data.attributes.forEach(function (item) {
        if (item.active) {
            columns.push({data: item.uiName});
        }
    });
    if (data.isAdmin) {
        columns.push({data: 'createdAt'}, {data: 'updatedAt'});
    }
    datatableOptions.columns = columns;
    datatableOptions.ajax = {
        url: App.constants.requestParameter.testvector.GET
    };
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].LIST)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.initializeDataTableAjax('datatable', data, filterPreferences, datatableOptions);
      });
};

App.views.TestvectorView.prototype.renderDetails = function (data) {
    var self = this;


    data.testvector = self.formatDate([data.testvector])[0];
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].DETAILS)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
      });
};

App.views.TestvectorView.prototype.renderGroupedList = function (data, filterPreferences) {
    var self = this;
    var datatableOptions = {};
    var columns = [
        {data: 'testvector'},
        {data: 'featureGroups'},
        {data: 'features'},
        {data: 'testcases'},
        {data: 'url'},
        {data: 'play'},
    ];
    data.attributes.forEach(function (item) {
        if (item.active) {
            columns.push({data: item.uiName});
        }
    });
    if (data.isAdmin) {
        columns.push({data: 'createdAt'}, {data: 'updatedAt'});
    }
    datatableOptions.columns = columns;
    datatableOptions.ajax = {
        url: App.constants.requestParameter.testvector.GROUPED_LIST
    };
    App.utils.HTTPUtils.get(App.constants.requestParameter[this.type + '_template'].GROUPED_LIST)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.initializeDataTableAjax('datatable', data, filterPreferences, datatableOptions);
      });
};

App.views.TestvectorView.prototype.importAttributes = function () {
    var url = $('#url').val();
    var data = [];
    var val;

    if (url !== '') {
        App.utils.HTTPUtils.get(url)
          .then(function (xml) {
              data = getMPDParameters(xml, data);
              data = data || [];
              data.forEach(function (item, index, array) {
                  // we iterate through the attributes, check if we have a corresponding Mapping and then take the value of the next item
                  if (IMPORT_MAPPING[item]) {
                      val = array[index + 1];
                      $('#' + IMPORT_MAPPING[item]).val(val);
                  }
              });
          });
    }
};

App.views.TestvectorView.prototype.renderEdit = function (data) {
    var q = Q.defer();
    var self = this;

    data.features = self.getTestcasesByFeature(data.testcases);
    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].EDIT)
      .then(function (templateData) {
          self.registerHandlebarsSelectHelper();
          self.renderHandlebars(templateData, data);
          $('#edit-form').parsley().on('form:submit', function () {
              EventBus.dispatch(App.constants.events[self.type].EDIT, this, self.getEditFieldValues());
              return false;
          });
          $('#import-attributes-button').bind('click', function () {
              self.importAttributes();
          });
          q.resolve();
      });
    return q.promise;
};

App.views.TestvectorView.prototype.registerHandlebarsSelectHelper = function () {
    Handlebars.registerHelper("select", function (value, options) {
        return options.fn(this)
          .split('\n')
          .map(function (v) {
              value.forEach(function (item) {
                  var t = 'value="' + item._id + '"';
                  if (RegExp(t).test(v)) {
                      v = v.replace(t, t + ' selected="selected"');
                  }
              });
              return v;
          })
          .join('\n');
    });
};

App.views.TestvectorView.prototype.getFieldValues = function () {
    var values = {};

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.url = $('#url').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            attribute: obj.attributes['attribute-id'].value
        });
    });
    values.testcases = [];
    $("#testcase-select option:selected").each(function () {
        values.testcases.push($(this).val());
    });
    return values;
};

App.views.TestvectorView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.name = $('#name').val();
    values.active = $('input[name=active]:checked').val();
    values.includeInDashjsJson = $('input[name=json]:checked').val();
    values.url = $('#url').val();
    values.attributeInstances = [];
    $('.dynamic-attribute').each(function (i, obj) {
        values.attributeInstances.push({
            value: obj.value,
            '_id': obj.attributes['attribute-instance-id'].value
        });
    });
    values.testcases = [];
    $("#testcase-select option:selected").each(function () {
        values.testcases.push($(this).val());
    });
    values.id = self.getIdFromHiddenField();

    return values;
};

App.views.TestvectorView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.TestvectorView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};

App.views.TestvectorView.prototype.getTestcasesByFeature = function (testcases) {
    var features = [];
    var result = [];

    testcases.forEach(function (item) {
        if (!features[item.feature.name]) {
            features[item.feature.name] = {data: item.feature, testcases: []};
        }
        features[item.feature.name].testcases.push(item);
    });
    // We need to turn it into a numeric array for Handlebars
    for (var key in features) {
        result.push(features[key]);
    }

    return result;
};

App.views.TestvectorView.prototype.initializeDataTableAjax = function (id, data, filterPreferences, datatableOptions) {
    var self = this;
    var buttonCommon = {
        exportOptions: {
            format: {
                body: function (data, row, column, node) {
                    // if this is the first column and "details" is in the url it must be the textvector column.
                    if (column === 0 && data.indexOf('details') !== -1) {
                        return data.replace(/<a\b[^>]*>/i, "").replace(/<\/a>/i, "");
                    }
                    else if (data.indexOf('</a>') !== -1) {
                        data = data.match(/href=([^]*)/)[1];
                        if (data.indexOf('>Link</a>')) {
                            data = data.replace('>Link</a>', '');
                        }
                        if (data.indexOf('>Play</a>')) {
                            data = data.replace('>Play</a>', '');
                        }
                    }
                    return data;
                }
            }
        }
    };

    datatableOptions = datatableOptions || {};
    datatableOptions.pageLength = 50;
    datatableOptions.deferRender = true;
    datatableOptions.ajax.dataSrc = function (json) {
        var result = [];

        if (data.isAdmin) {
            return json.data;
        }
        else if (json && json.data && json.data.length) {
            result = json.data.filter(function (item) {
                return item.active;
            });
        }

        return result;
    };
    datatableOptions.lengthMenu = [[10, 25, 50, -1], [10, 25, 50, "All"]];
    datatableOptions.scrollX = true;
    datatableOptions.dom = 'Bfrtip';
    datatableOptions.buttons = [
        'pageLength',
        $.extend(true, {}, buttonCommon, {
            extend: 'copyHtml5'
        }),
        $.extend(true, {}, buttonCommon, {
            extend: 'excelHtml5',
            fieldSeparator: ';'
        }),
        $.extend(true, {}, buttonCommon, {
            extend: 'csvHtml5',
            fieldSeparator: ';'
        })];
    datatableOptions.deferRender = true;
    self.createDatatableFilters(id);
    // DataTable
    var table = $('#' + id).DataTable(datatableOptions);

    self.addDatatablesSelect(table);
    self.addDatatablesSearch(table, data, filterPreferences);
    self.setContentHeight();
};


/**
 * Created by danielsilhavy on 09.08.16.
 */

App.views.UserView = function () {
    App.views.MainView.call(this, 'user');
};

App.views.UserView.prototype = new App.views.MainView();
App.views.UserView.prototype.constructor = App.views.UserView;

App.views.UserView.prototype.renderList = function (data, filterPreferences) {
    var self = this;
    var button;

    App.utils.HTTPUtils.get(App.constants.requestParameter[self.type + '_template'].LIST)
      .then(function (templateData) {
          self.renderHandlebars(templateData, data);
          self.initializeDataTable('datatable', data, filterPreferences);
          $('.delete-button').on('click', function () {
              button = this;
              alertify.confirm('Delete an element', 'Are you sure you want to delete the element?', function () {
                  EventBus.dispatch(App.constants.events[self.type].DELETE, self, self.getIdFromButton(button));
              }, function () {
                  alertify.error('Canceled');
              });
          });
      });
};

App.views.UserView.prototype.getFieldValues = function () {
    var values = {};

    values.username = $('#username').val();
    values.password = $('#password').val();
    values.firstname = $('#firstname').val();
    values.lastname = $('#lastname').val();
    values.role = $("#role-select option:selected").val();
    values.email = $('#email').val();
    values.companyname = $('#company-name').val();
    return values;
};

App.views.UserView.prototype.getEditFieldValues = function () {
    var values = {};
    var self = this;

    values.username = $('#username').val();
    values.password = $('#password').val();
    values.firstname = $('#firstname').val();
    values.lastname = $('#lastname').val();
    values.role = $("#role-select option:selected").val();
    values.email = $('#email').val();
    values.companyname = $('#company-name').val();
    values.id = self.getIdFromHiddenField();
    return values;
};

App.views.UserView.prototype.getIdFromHiddenField = function () {
    return $('#element-id').val() || null;
};

App.views.UserView.prototype.getIdFromButton = function (element) {
    return element.attributes['element-id'].value;
};


/**
 * Created by danielsilhavy on 02.08.16.
 */

// Make this model a singleton
(function () {
    var instance;

    App.models.LoginModel = function () {

    };

    App.models.LoginModel.getInstance = function () {
        if (!instance) {
            instance = new App.models.LoginModel();
        }
        return instance;
    };

    App.models.LoginModel.prototype.loginUser = function (data) {
        var q = Q.defer();
        var self = this;

        App.utils.HTTPUtils.post(App.constants.requestParameter.LOGIN_USER, data)
          .then(function (data) {
              self.saveLoginData(data);
              q.resolve();
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.LoginModel.prototype.logoutUser = function () {
        localStorage.removeItem('dashtoken');
        Cookies.remove('dashtoken');
    };

    App.models.LoginModel.prototype.getLoginData = function () {
        if (localStorage.getItem('dashtoken')) {
            return $.parseJSON(localStorage.getItem('dashtoken'));
        } else if (Cookies.get('dashtoken')) {
            return $.parseJSON(Cookies.get('dashtoken'));
        }
        else {
            return null;
        }
    };

    App.models.LoginModel.prototype.saveLoginData = function (data) {
        localStorage.setItem('dashtoken', JSON.stringify(data));
        // we also store it in a cookie in case the user opens a protected page in a new tab
        Cookies.set('dashtoken', JSON.stringify(data));
    };

    App.models.LoginModel.prototype.getFilterPreferences = function () {
        var user = this.getLoginData();
        var username = 'nouser';
        var item;

        if (user && user.username) {
            username = user.username;
        }

        if (localStorage.getItem('filterPreferences')) {
            item = $.parseJSON(localStorage.getItem('filterPreferences'));
            if (item[username]) {
                return item[username];
            } else {
                return {};
            }
        } else {
            return {};
        }
    };

    App.models.LoginModel.prototype.setFilterPreferences = function (type, attributes) {
        var preferences;
        var user = this.getLoginData();
        var username = 'nouser';

        if (user && user.username) {
            username = user.username;
        }
        if (localStorage.getItem('filterPreferences')) {
            preferences = $.parseJSON(localStorage.getItem('filterPreferences'));
            preferences = preferences || {};
        } else {
            preferences = {};
        }

        if (!preferences[username]) {
            preferences[username] = {};
        }

        if (!preferences[username][type]) {
            preferences[username][type] = {};
        }

        attributes.forEach(function (item) {
            preferences[username][type][item.name] = item.selected;
        });
        localStorage.setItem('filterPreferences', JSON.stringify(preferences));

    };

    App.models.LoginModel.prototype.getDisclaimer = function (loginData) {
        var username = 'nouser';
        var item;

        if (loginData && loginData.username) {
            username = loginData.username;
        }

        if (localStorage.getItem('disclaimer')) {
            item = $.parseJSON(localStorage.getItem('disclaimer'));
            if (item[username]) {
                return item[username];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    App.models.LoginModel.prototype.setDisclaimer = function (value) {
        var user = this.getLoginData();
        var username = 'nouser';
        var disclaimer;

        if (user && user.username) {
            username = user.username;
        }

        if (localStorage.getItem('disclaimer')) {
            disclaimer = $.parseJSON(localStorage.getItem('disclaimer'));
            disclaimer = disclaimer || {};
        } else {
            disclaimer = {};
        }

        disclaimer[username] = value;
        // TODO Remove that this is only for users who used the old dev page and have an outdated local storage
        if (!disclaimer[username]) {
            localStorage.removeItem('disclaimer');
            disclaimer = {};
            disclaimer[username] = value;
        }
        localStorage.setItem('disclaimer', JSON.stringify(disclaimer));
    };

    App.models.LoginModel.prototype.getToken = function () {
        var token = null;

        if (localStorage.getItem('dashtoken')) {
            token = $.parseJSON(localStorage.getItem('dashtoken')).token || null;
        } else if (Cookies.get('dashtoken')) {
            token = $.parseJSON(Cookies.get('dashtoken')).token || null;
        }

        return token;
    };

    App.models.LoginModel.prototype.isAdmin = function () {
        var loginData = this.getLoginData();

        if (!loginData || !loginData.roles || !loginData.roles.length) {
            return false;
        }

        return loginData.roles.filter(function (role) {
            return role === 'superuser' || role === 'admin';
        }).length;
    };
})();





/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.MainModel = function (type) {
    this.loginModel = App.models.LoginModel.getInstance();
    this.type = type;
};

App.models.MainModel.prototype.getElements = function () {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].GET_MULTI;

    App.utils.HTTPUtils.get(url,token)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};


App.models.MainModel.prototype.createElements = function (data) {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].CREATE;

    App.utils.HTTPUtils.post(url,data,token)
      .then(function () {
          q.resolve();
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.MainModel.prototype.editElement = function (data) {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].EDIT;

    App.utils.HTTPUtils.put(url + '/' + data.id,data,token)
      .then(function () {
          q.resolve();
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.MainModel.prototype.deleteElement = function (id) {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].DELETE;

    App.utils.HTTPUtils.delete(url + '/' + id,token)
      .then(function () {
          q.resolve();
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.MainModel.prototype.getElementById = function (id) {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].GET;

    App.utils.HTTPUtils.get(url + '/' + id,token)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.MainModel.prototype.getMyElements = function () {
    var q = Q.defer();
    var token = this.loginModel.getToken();
    var url = App.constants.requestParameter[this.type].MYLIST;

    App.utils.HTTPUtils.get(url,token)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};
/**
 * Created by danielsilhavy on 02.08.16.
 */


App.models.AttributeModel = function () {
    App.models.MainModel.call(this, 'attribute');
};



App.models.AttributeModel.prototype = new App.models.MainModel();
App.models.AttributeModel.prototype.constructor = App.models.AttributeModel;
/**
 * Created by danielsilhavy on 02.08.16.
 */


App.models.FeatureGroupModel = function () {
    App.models.MainModel.call(this, 'featureGroup');
};

App.models.FeatureGroupModel.prototype = new App.models.MainModel();

App.models.FeatureGroupModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.FEATURE_GROUP)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureGroupModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.featureGroup.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureGroupModel.prototype.getFeatures = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.featureGroup.GET + '/' + id + '/features')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureGroupModel.prototype.constructor = App.models.FeatureGroupModel;
/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.FeatureModel = function () {
    App.models.MainModel.call(this, 'feature');
};

App.models.FeatureModel.prototype = new App.models.MainModel();

App.models.FeatureModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.FEATURE)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureModel.prototype.getTestcases = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.feature.GET + '/' + id + '/testcases')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.feature.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.FeatureModel.prototype.constructor = App.models.FeatureModel;
/**
 * Created by danielsilhavy on 05.09.16.
 */
(function () {
    "use strict";
    // Make this model a singleton
    var instance;

    App.models.StatisticModel = function () {

    };

    App.models.StatisticModel.getInstance = function () {
        if (!instance) {
            instance = new App.models.StatisticModel();
        }
        return instance;
    };

    App.models.StatisticModel.prototype.getSize = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.SIZE)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getTestvectorTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.TESTVECTOR_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getTestcaseTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.TESTCASE_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getFeatureTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.FEATURE_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };

    App.models.StatisticModel.prototype.getFeatureGroupTypes = function () {
        var q = Q.defer();

        App.utils.HTTPUtils.get(App.constants.requestParameter.statistic.FEATUREGROUP_TYPES)
          .then(function (data) {
              q.resolve(data);
          })
          .catch(function (error) {
              q.reject(error);
          });
        return q.promise;
    };
})();

/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.TestcaseModel = function () {
    App.models.MainModel.call(this, 'testcase');
};

App.models.TestcaseModel.prototype = new App.models.MainModel();

App.models.TestcaseModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.TESTCASE)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcaseModel.prototype.getTestvectors = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testcase.GET + '/' + id + '/testvectors')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcaseModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testcase.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestcaseModel.prototype.constructor = App.models.TestcaseModel;
/**
 * Created by danielsilhavy on 02.08.16.
 */

App.models.TestvectorModel = function () {
    App.models.MainModel.call(this, 'testvector');
};

App.models.TestvectorModel.prototype = new App.models.MainModel();

App.models.TestvectorModel.prototype.getAttributes = function () {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.attribute.GET_MULTI + '?type=' + App.constants.types.TESTVECTOR)
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestvectorModel.prototype.getTestvectors = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testcase.GET + '/' + id + '/testvectors')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};

App.models.TestvectorModel.prototype.getDetails = function (id) {
    var q = Q.defer();

    App.utils.HTTPUtils.get(App.constants.requestParameter.testvector.GET + '/' + id + '/details')
      .then(function (data) {
          q.resolve(data);
      })
      .catch(function (error) {
          q.reject(error);
      });

    return q.promise;
};
App.models.TestvectorModel.prototype.constructor = App.models.TestvectorModel;
/**
 * Created by danielsilhavy on 01.08.16.
 */

App.models.UserModel = function () {
    App.models.MainModel.call(this, 'user');
};

App.models.UserModel.prototype = new App.models.MainModel();
App.models.UserModel.prototype.constructor = App.models.UserModel;
/**
 * Created by danielsilhavy on 01.08.16.
 */

App.controller.MainController = function (model, view, type) {
    this.model = model;
    this.view = view;
    this.type = type;
    this.loginModel = App.models.LoginModel.getInstance();
};

App.controller.MainController.prototype.registerEvents = function () {
    var self = this;

    EventBus.addEventListener(App.constants.events[self.type].CREATE, self.onCreateElement.bind(this));
    EventBus.addEventListener(App.constants.events[self.type].EDIT, self.onEditElement.bind(this));
    EventBus.addEventListener(App.constants.events[self.type].DELETE, self.onDeleteElement.bind(this));
    EventBus.addEventListener(App.constants.events[self.type].TOGGLE_COLUMN, self.onToggleColumn.bind(this));
};

App.controller.MainController.prototype.onToggleColumn = function (callee, data) {
    this.loginModel.setFilterPreferences(data.type, data.attributes);
};

App.controller.MainController.prototype.onCreateElement = function (callee, data) {
    var self = this;
    // We need to add the createdby field
    data.createdby = self.loginModel.getLoginData()._id;
    self.model.createElements(data)
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Created element'});
          self.actionCreate();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionCreate();
      });
};

App.controller.MainController.prototype.onEditElement = function (callee, data) {
    var self = this;

    self.model.editElement(data)
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Edited element'});
          self.view.setRoute(self.type.toLowerCase() + '/mylist');
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionEdit();
      });
};

App.controller.MainController.prototype.onDeleteElement = function (callee, id) {
    var self = this;

    self.model.deleteElement(id)
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Deleted element'});
          self.actionMyList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionMyList();
      });
};

App.controller.MainController.prototype.handleRequest = function (route) {
    var action;
    var id;

    action = typeof route[1] !== 'undefined' ? route[1] : 'default';
    switch (action) {
      // get all the attributes and list them
        case 'list':
            this.actionList();
            break;
        case 'groupedList':
            this.actionGroupedList();
            break;
        case 'create':
            this.actionCreate();
            break;
        case 'edit':
            id = typeof route[2] !== 'undefined' ? route[2] : null;
            this.actionEdit(id);
            break;
        case 'mylist':
            this.actionMyList();
            break;
        case 'details':
            id = typeof route[2] !== 'undefined' ? route[2] : null;
            this.actionDetail(id);
            break;
        default:
            this.actionList();
    }
};

App.controller.MainController.prototype.actionList = function () {
    var renderData = {};
    var self = this;
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getElements()
      .then(function (data) {
          renderData.entries = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          self.view.renderList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.MainController.prototype.actionCreate = function () {
    return this.view.renderCreate();
};

App.controller.MainController.prototype.actionEdit = function (id) {
    var self = this;

    if (!id) {
        App.handler.Errorhandler.handleError(new Error('Invalid ID specified'));
    } else {
        self.model.getElementById(id)
          .then(function (data) {
              self.view.renderEdit(data);
          })
          .catch(function (error) {
              App.handler.Errorhandler.handleError(error);
          });
    }
};

App.controller.MainController.prototype.actionMyList = function () {
    var renderData = {};
    var self = this;
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getMyElements()
      .then(function (data) {
          renderData.entries = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          self.view.renderMyList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.MainController.prototype.filterInactiveTestcases = function (items) {
    var result;

    result = items.filter(function (tc) {
        var valid = false;

        if (!tc.active) {
            return false;
        }
        if (tc.hasOwnProperty('feature')) {
            if (tc.feature.active && tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                valid = true;
            }
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.MainController.prototype.filterInactiveFeatures = function (items) {
    var result;

    result = items.filter(function (feature) {
          var valid = false;

          if (!feature.active) {
              return false;
          }
          if (feature.hasOwnProperty('featureGroup')) {
              if (feature.featureGroup.active) {
                  valid = true;
              }
          } else {
              valid = true;
          }
          return valid;
      }
    );
    return result;
};

App.controller.MainController.prototype.filterInactiveFeatureGroups = function (items) {
    return items.filter(function (item) {
        return item.active;
    });
};

App.controller.MainController.prototype.filterInactiveTestvectors = function (items) {
    var result;

    result = items.filter(function (item) {
        var valid = false;

        if (!item.active) {
            return false;
        }
        if (item.hasOwnProperty('testcases')) {
            item.testcases.forEach(function (tc) {
                if (tc.active) {
                    if (tc.hasOwnProperty('feature') && tc.feature.active) {
                        if (tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                            valid = true;
                        }
                    }
                }
            });
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.MainController.prototype.filterData = function (items) {
    var self = this;

    if (items.hasOwnProperty('featureGroups')) {
        items.featureGroups = self.filterInactiveFeatureGroups(items.featureGroups);
    }
    if (items.hasOwnProperty('features')) {
        items.features = self.filterInactiveFeatures(items.features);
    }
    if (items.hasOwnProperty('testcases')) {
        items.testcases = self.filterInactiveTestcases(items.testcases);
    }
    if (items.hasOwnProperty('testvectors')) {
        items.testvectors = self.filterInactiveTestvectors(items.testvectors);
    }
    return items;
};





/**
 * Created by danielsilhavy on 01.08.16.
 */

App.controller.AttributeController = function () {
    var model = new App.models.AttributeModel();
    var view = new App.views.AttributeView();
    App.controller.MainController.call(this, model, view, 'attribute');
    this.registerEvents();
};

App.controller.AttributeController.prototype = new App.controller.MainController();
App.controller.AttributeController.prototype.constructor = App.controller.AttributeController;



/**
 * Created by danielsilhavy on 01.08.16.
 */

App.controller.DefaultController = function () {
    this.view = new App.views.DefaultView();
    this.statisticModel = App.models.StatisticModel.getInstance();
};

App.controller.DefaultController.prototype.handleRequest = function (route) {
    var action;

    action = typeof route[1] !== 'undefined' ? route[1] : 'default';
    switch (action) {
        case 'faq':
            this.actionFAQ();
            break;
        default:
            this.actionDefault();
    }
};

App.controller.DefaultController.prototype.actionDefault = function () {
    var self = this;
    var data = {};
    var promises = [];

    promises.push(this.statisticModel.getTestvectorTypes());
    promises.push(this.statisticModel.getTestcaseTypes());
    promises.push(this.statisticModel.getFeatureTypes());
    promises.push(this.statisticModel.getFeatureGroupTypes());
    Q.all(promises)
      .then(function (result) {
          data.testvectorTypes = self.filterTestvectors(result[0]);
          data.testcaseTypes = self.filterTestcases(result[1]);
          data.featureTypes = self.filterFeatures(result[2]);
          data.featureGroupTypes = result[3];
          data.size = {
              featureGroups: data.featureGroupTypes.length,
              features: data.featureTypes.length,
              testcases: data.testcaseTypes.length,
              testvectors: data.testvectorTypes.length
          };
          // Filter the items which parent/parents are inactive
          self.view.renderIndex(data);
      })
      .catch(function (err) {
          App.handler.Errorhandler.handleError(err);
      });
};

App.controller.DefaultController.prototype.actionFAQ = function () {
    this.view.renderFAQ();
};

App.controller.DefaultController.prototype.filterTestvectors = function (elems) {
    var result;

    result = elems.filter(function (item) {
        var valid = false;

        if (item.hasOwnProperty('testcases')) {
            item.testcases.forEach(function (tc) {
                if (tc.active) {
                    if (tc.hasOwnProperty('feature') && tc.feature.active) {
                        if (tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                            valid = true;
                        }
                    }
                }
            });
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.DefaultController.prototype.filterTestcases = function (elems) {
    var result;

    result = elems.filter(function (tc) {
        var valid = false;

        if (tc.hasOwnProperty('feature')) {
            if (tc.feature.active && tc.feature.hasOwnProperty('featureGroup') && tc.feature.featureGroup.active) {
                valid = true;
            }
        } else {
            valid = true;
        }
        return valid;
    });
    return result;
};

App.controller.DefaultController.prototype.filterFeatures = function (elems) {
    var result;

    result = elems.filter(function (feature) {
          var valid = false;

          if (feature.hasOwnProperty('featureGroup')) {
              if (feature.featureGroup.active) {
                  valid = true;
              }
          } else {
              valid = true;
          }
          return valid;
      }
    );
    return result;
};



/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.FeatureController = function () {
    this.model = new App.models.FeatureModel();
    this.featureGroupModel = new App.models.FeatureGroupModel();
    this.view = new App.views.FeatureView();
    App.controller.MainController.call(this, this.model, this.view, 'feature');
    this.registerEvents();
};

App.controller.FeatureController.prototype = new App.controller.MainController();


App.controller.FeatureController.prototype.actionCreate = function () {
    var self = this;
    var promises = [];

    promises.push(self.model.getAttributes());
    promises.push(self.featureGroupModel.getElements());

    Q.all(promises)
      .then(function (result) {
          return self.view.renderCreate({attributes: result[0], featureGroups: result[1]});
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};


App.controller.FeatureController.prototype.actionList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getElements()
      .then(function (data) {
          renderData.isAdmin = self.loginModel.isAdmin();
          if(!renderData.isAdmin) {
              data = self.filterInactiveFeatures(data);
          }
          renderData.entries = data;
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderList(renderData,filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureController.prototype.actionMyList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getMyElements()
      .then(function (data) {
          renderData.entries = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderMyList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureController.prototype.actionDetail = function (id) {
    var self = this;

    self.model.getDetails(id)
      .then(function (data) {
          data = self.filterData(data);
          self.view.renderDetails(data);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureController.prototype.onDeleteElement = function (callee, id) {
    var self = this;

    //check if there is a feature with that featureGroup
    self.model.getTestcases(id)
      .then(function (items) {
          if (items.length > 0) {
              throw new Error('Can not delete element since it is referenced in one or more Testcases');
          } else {
              return self.model.deleteElement(id);
          }
      })
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Deleted feature'});
          self.actionMyList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionMyList();
      });
};

App.controller.FeatureController.prototype.actionEdit = function (id) {
    var self = this;
    var promises = [];

    if (!id) {
        App.handler.Errorhandler.handleError(new Error('Invalid ID specified'));
        self.actionList();
    } else {
        promises.push(self.model.getElementById(id));
        promises.push(self.featureGroupModel.getElements());
        Q.all(promises)
          .then(function (result) {
              self.view.renderEdit({element: result[0], featureGroups: result[1], });
          })
          .catch(function (error) {
              App.handler.Errorhandler.handleError(error);
          });
    }
};

App.controller.FeatureController.prototype.constructor = App.controller.FeatureController;

/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.FeatureGroupController = function () {
    this.model = new App.models.FeatureGroupModel();
    this.view = new App.views.FeatureGroupView();
    App.controller.MainController.call(this, this.model, this.view, 'featureGroup');
    this.registerEvents();
};

App.controller.FeatureGroupController.prototype = new App.controller.MainController();


App.controller.FeatureGroupController.prototype.actionCreate = function () {
    var self = this;

    self.model.getAttributes()
      .then(function (attributes) {
          return self.view.renderCreate({attributes: attributes});
      });
};


App.controller.FeatureGroupController.prototype.actionList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getElements()
      .then(function (data) {
          renderData.isAdmin = self.loginModel.isAdmin();
          if(!renderData.isAdmin) {
              data = self.filterInactiveFeatureGroups(data);
          }
          renderData.entries = data;
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureGroupController.prototype.actionMyList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getMyElements()
      .then(function (data) {
          renderData.entries = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderMyList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureGroupController.prototype.actionDetail = function (id) {
    var self = this;

    self.model.getDetails(id)
      .then(function (data) {
          data = self.filterData(data);
          self.view.renderDetails(data);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.FeatureGroupController.prototype.onDeleteElement = function (callee, id) {
    var self = this;

    //check if there is a feature with that featureGroup
    self.model.getFeatures(id)
      .then(function (items) {
          if (items.length > 0) {
              throw new Error('Can not delete element since it is referenced in one or more features');
          } else {
              return self.model.deleteElement(id);
          }
      })
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Deleted Feature Group'});
          self.actionMyList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionMyList();
      });
};

App.controller.FeatureGroupController.prototype.constructor = App.controller.FeatureController;
/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.LoginController = function () {
    this.view = new App.views.LoginView();
    this.model = App.models.LoginModel.getInstance();
    this.mainView = new App.views.MainView();
    this.registerEvents();

};

App.controller.LoginController.prototype.registerEvents = function () {
    var self = this;

    EventBus.addEventListener(App.constants.events.LOGIN, self.onLogin.bind(this));
};

App.controller.LoginController.prototype.handleRequest = function (route) {
    var action;

    action = typeof route[0] !== 'undefined' ? route[0] : 'default';
    switch (action) {
      // get all the attributes and list them
        case '#login':
            this.actionLogin();
            break;
        case '#logout':
            this.actionLogout();
            break;
    }
};

App.controller.LoginController.prototype.actionLogin = function () {
    if (!this.model.getLoginData()) {
        this.view.renderLogin();
    }
};

App.controller.LoginController.prototype.actionLogout = function () {
    this.model.logoutUser();
    App.views.MessageView.renderSuccessMessage({message:'Logged out'});
    this.mainView.setRoute('login');
};

App.controller.LoginController.prototype.onLogin = function (callee, data) {
    var self = this;

    self.model.loginUser(data)
      .then(function () {
          App.views.MessageView.renderSuccessMessage({message:'Logged in'});
          self.mainView.setRoute('');
      })
      .catch(function (error) {
        App.handler.Errorhandler.handleError(error);
      });
};


/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.TestcaseController = function () {
    this.model = new App.models.TestcaseModel();
    this.featureModel = new App.models.FeatureModel();
    this.view = new App.views.TestcaseView();
    App.controller.MainController.call(this, this.model, this.view, 'testcase');
    this.registerEvents();
};

App.controller.TestcaseController.prototype = new App.controller.MainController();


App.controller.TestcaseController.prototype.actionCreate = function () {
    var self = this;
    var promises = [];

    promises.push(self.model.getAttributes());
    promises.push(self.featureModel.getElements());

    Q.all(promises)
      .then(function (result) {
          return self.view.renderCreate({attributes: result[0], features: result[1]});
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};


App.controller.TestcaseController.prototype.actionList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getElements()
      .then(function (data) {
          renderData.isAdmin = self.loginModel.isAdmin();
          if(!renderData.isAdmin) {
              data = self.filterInactiveTestcases(data);
          }
          renderData.entries = data;
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestcaseController.prototype.actionEdit = function (id) {
    var self = this;
    var promises = [];

    if (!id) {
        App.handler.Errorhandler.handleError(new Error('Invalid ID specified'));
        self.actionList();
    } else {
        promises.push(self.model.getElementById(id));
        promises.push(self.featureModel.getElements());
        Q.all(promises)
          .then(function (result) {
              self.view.renderEdit({element: result[0], features: result[1],});
          })
          .catch(function (error) {
              App.handler.Errorhandler.handleError(error);
          });
    }
};

App.controller.TestcaseController.prototype.actionMyList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getMyElements()
      .then(function (data) {
          renderData.entries = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          self.view.renderMyList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestcaseController.prototype.actionDetail = function (id) {
    var self = this;

    self.model.getDetails(id)
      .then(function (data) {
          data = self.filterData(data);
          self.view.renderDetails(data);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestcaseController.prototype.onDeleteElement = function (callee, id) {
    var self = this;

    //check if there is a feature with that featureGroup
    self.model.getTestvectors(id)
      .then(function (items) {
          if (items.length > 0) {
              throw new Error('Can not delete element since it is referenced in one or more Testvectors');
          } else {
              return self.model.deleteElement(id);
          }
      })
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Deleted Testcase'});
          self.actionMyList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionMyList();
      });
};

App.controller.TestcaseController.prototype.constructor = App.controller.TestcaseController;

/**
 * Created by danielsilhavy on 02.08.16.
 */

App.controller.TestvectorController = function () {
    this.model = new App.models.TestvectorModel();
    this.testcaseModel = new App.models.TestcaseModel();
    this.view = new App.views.TestvectorView();
    App.controller.MainController.call(this, this.model, this.view, 'testvector');
    this.registerEvents();
};

App.controller.TestvectorController.prototype = new App.controller.MainController();

App.controller.TestvectorController.prototype.actionCreate = function () {
    var self = this;
    var promises = [];

    promises.push(self.model.getAttributes());
    promises.push(self.testcaseModel.getElements());

    Q.all(promises)
      .then(function (result) {
          return self.view.renderCreate({attributes: result[0], testcases: result[1]});
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};


App.controller.TestvectorController.prototype.actionList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getAttributes()
      .then(function (data) {
          renderData.attributes = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          self.view.renderList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestvectorController.prototype.actionMyList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();

    self.model.getMyElements()
      .then(function (data) {
          renderData.entries = data;
          return self.model.getAttributes();
      })
      .then(function (data) {
          renderData.attributes = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          self.view.renderMyList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestvectorController.prototype.actionDetail = function (id) {
    var self = this;

    self.model.getDetails(id)
      .then(function (data) {
          data = self.filterData(data);
          self.view.renderDetails(data);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestvectorController.prototype.actionEdit = function (id) {
    var self = this;
    var promises = [];

    if (!id) {
        App.handler.Errorhandler.handleError(new Error('Invalid ID specified'));
        self.actionList();
    } else {
        promises.push(self.model.getElementById(id));
        promises.push(self.testcaseModel.getElements());
        Q.all(promises)
          .then(function (result) {
              self.view.renderEdit({element: result[0], testcases: result[1],});
          })
          .catch(function (error) {
              App.handler.Errorhandler.handleError(error);
          });
    }
};

App.controller.TestvectorController.prototype.actionGroupedList = function () {
    var self = this;
    var renderData = {};
    var filterPreferences = self.loginModel.getFilterPreferences();


    self.model.getAttributes()
      .then(function (data) {
          renderData.attributes = data;
          renderData.isAdmin = self.loginModel.isAdmin();
          self.view.renderGroupedList(renderData, filterPreferences);
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.TestvectorController.prototype.onDeleteElement = function (callee, id) {
    var self = this;

    //check if there is a feature with that featureGroup
    self.model.deleteElement(id)
      .then(function () {
          self.view.clearView();
          App.views.MessageView.renderSuccessMessage({message: 'Deleted Testvector'});
          self.actionMyList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
          self.actionMyList();
      });
};


App.controller.TestvectorController.prototype.constructor = App.controller.TestvectorController;

/**
 * Created by danielsilhavy on 20.07.16.
 */


App.controller.UserController = function () {
    var model = new App.models.UserModel();
    var view = new App.views.UserView();
    App.controller.MainController.call(this, model, view, 'user');
    this.registerEvents();
};

App.controller.UserController.prototype = new App.controller.MainController();

App.controller.UserController.prototype.onEditElement = function (callee, data) {
    var self = this;

    self.model.editElement(data)
      .then(function () {
          self.view.clearView();
          return App.views.MessageView.renderSuccessMessage({message: 'Edited element'});
      })
      .then(function () {
          self.view.setRoute(self.type.toLowerCase() + '/list');
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.UserController.prototype.onDeleteElement = function (callee,id) {
    var self = this;

    self.model.deleteElement(id)
      .then(function () {
          self.view.clearView();
          return App.views.MessageView.renderSuccessMessage({message: 'Deleted User'});
      })
      .then(function () {
          self.actionList();
      })
      .catch(function (error) {
          App.handler.Errorhandler.handleError(error);
      });
};

App.controller.UserController.prototype.constructor = App.controller.UserController;



/**
 * Created by Daniel Silhavy on 27.07.16.
 */


App.Router = function () {
    this.featureController = new App.controller.FeatureController();
    this.attributeController = new App.controller.AttributeController();
    this.loginController = new App.controller.LoginController();
    this.featureGroupController = new App.controller.FeatureGroupController();
    this.testcaseController = new App.controller.TestcaseController();
    this.testvectorController = new App.controller.TestvectorController();
    this.defaultController = new App.controller.DefaultController();
    this.userController = new App.controller.UserController();
    this.helperView = new App.views.MainView();
    this.loginModel = App.models.LoginModel.getInstance();
};

App.Router.prototype.init = function () {
    this.registerEventHandler();
};

App.Router.prototype.registerEventHandler = function () {
    var self = this;

    $(window).on('hashchange', function () {
        self.startupRoutine();
    });
    $(window).on('load', function () {
        self.startupRoutine();
    });

    EventBus.addEventListener(App.constants.events.DISCLAIMER, self.onDisclaimerAgree.bind(this));
};

App.Router.prototype.onDisclaimerAgree = function (callee,value) {
    var self = this;

    self.loginModel.setDisclaimer(value);
    self.defaultController.handleRequest('');
};

App.Router.prototype.startupRoutine = function () {
    this.route(decodeURI(window.location.hash));
};

App.Router.prototype.route = function (url) {
    var self = this;
    var route = url.split('/');
    var disclaimer;
    var loginData = self.loginModel.getLoginData();

    disclaimer = self.loginModel.getDisclaimer(loginData);
    self.helperView.toggleMenuState(loginData);
    self.helperView.setActiveItem(route);

    if (!disclaimer || disclaimer === 'false') {
        self.helperView.renderDisclaimer();
    } else {
        self.helperView.renderLoadingAnimation();

        switch (route[0]) {
            case '#featuregroup':
                self.featureGroupController.handleRequest(route);
                break;
            case '#feature':
                self.featureController.handleRequest(route);
                break;
            case '#testcase':
                self.testcaseController.handleRequest(route);
                break;
            case '#testvector':
                self.testvectorController.handleRequest(route);
                break;
            case '#attribute':
                self.attributeController.handleRequest(route);
                break;
            case '#user':
                self.userController.handleRequest(route);
                break;
            case '#login':
                self.loginController.handleRequest(route);
                break;
            case '#logout':
                self.loginController.handleRequest(route);
                break;
            default :
                self.defaultController.handleRequest(route);

        }
    }
};



"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urls = void 0;
var urls = /** @class */ (function () {
    function urls() {
    }
    urls.gitLabCreateGroupURL = 'https://gitlab.eng.vmware.com/api/v4/groups/';
    urls.gitLabAddBotURL = 'https://gitlab.eng.vmware.com/api/v4/groups/{group-id}/members';
    urls.groupOnboarding = 'https://horizon-devfw.svc.eng.vmware.com/job/GroupOnBoarding/buildWithParameters';
    urls.serviceOnboarding = 'https://horizon-devfw.svc.eng.vmware.com/job/ServiceOnBoarding/buildWithParameters';
    urls.createRole = 'https://console-stg.cloud.vmware.com/csp/gateway/iam-roles-mgmt/api/services/{serviceId}/roles';
    urls.generateAccessToken = 'https://console-stg.cloud.vmware.com/csp/gateway/am/api/auth/api-tokens/authorize';
    urls.getAllUserOwnedGroup = "https://gitlab.eng.vmware.com/api/v4/groups?owned=true";
    urls.getAllProjectOfParticularGroup = "https://gitlab.eng.vmware.com/api/v4/groups/{group-id}/projects";
    urls.getDependency = "https://gitlab.eng.vmware.com/api/v4/projects/{project-id}/repository/tree";
    urls.addCommonService = "https://gitlab.eng.vmware.com//api/v4/projects/";
    urls.getAllBuildsOfSpecifiedJob = "https://horizon-devfw.svc.eng.vmware.com/job/{job-name}/api/json?tree=builds[name,result,url,timestamp,id]";
    urls.getFullConsoleOutput = "https://horizon-devfw.svc.eng.vmware.com/job/{job-name}/{build-id}/logText/progressiveText"
    return urls;
}());
exports.urls = urls;

import {
    Group,
    GroupResponse,
    GroupsResponse,
    List, ListNodeInfo, ListNodeInfoResponse,
    ListResponse,
    ListsResponse,
    Project,
    ProjectResponse,
    ProjectsResponse,
    User,
    UserResponse,
    UsersResponse
} from '../../declarations';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);


// ---- Projects ----
export const dokubibProjectIri = 'http://rdfh.ch/projects/00FE';
export const projectsResponseJson: any = { 'projects': [{ 'ontologies': ['http://www.knora.org/ontology/0001/anything', 'http://www.knora.org/ontology/0001/something'], 'shortname': 'anything', 'description': [{ 'value': 'Anything Project' }], 'shortcode': '0001', 'logo': null, 'id': 'http://rdfh.ch/projects/0001', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Anything Project' }, { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, { 'ontologies': ['http://www.knora.org/ontology/0803/incunabula'], 'shortname': 'incunabula', 'description': [{ 'value': '<p>Das interdisziplinäre Forschungsprojekt "<b><em>Die Bilderfolgen der Basler Frühdrucke: Spätmittelalterliche Didaxe als Bild-Text-Lektüre</em></b>" verbindet eine umfassende kunstwissenschaftliche Analyse der Bezüge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der Bestände der Universitätsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgeführt vom <a href="http://kunsthist.unibas.ch">Kunsthistorischen Seminar</a> der Universität Basel (Prof. B. Schellewald) und dem <a href="http://www.dhlab.unibas.ch">Digital Humanities Lab</a> der Universität Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas Kernstück der digitalen Edition besteht aus rund zwanzig reich bebilderten Frühdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfältige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine,  die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und Erbauungsbüchlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berühmte Narrenschiff  sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser Frühdrucke  durch die Möglichkeiten nichtlinearer Verknüpfung und Kommentierung der Bilder und Texte, für die wissenschaftliche Edition sowie für die Erforschung der Bilder und Texte nutzbar machen. Auch können bereits bestehende und entstehende Online-Editionen damit verknüpft  werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>' }], 'shortcode': '0803', 'logo': 'incunabula_logo.png', 'id': 'http://rdfh.ch/projects/0803', 'status': true, 'selfjoin': false, 'keywords': ['Basel', 'Basler Frühdrucke', 'Bilderfolgen', 'Contectualisation of images', 'Inkunabel', 'Kunsthistorisches Seminar Universität Basel', 'Late Middle Ages', 'Letterpress Printing', 'Narrenschiff', 'Sebastian Brant', 'Wiegendrucke', 'early print', 'incunabula', 'ship of fools'], 'longname': 'Bilderfolgen Basler Frühdrucke' }, { 'ontologies': ['http://www.knora.org/ontology/0804/dokubib'], 'shortname': 'dokubib', 'description': [{ 'value': 'Dokubib' }], 'shortcode': '0804', 'logo': null, 'id': 'http://rdfh.ch/projects/0804', 'status': false, 'selfjoin': false, 'keywords': [], 'longname': 'Dokubib' }, { 'ontologies': ['http://www.knora.org/ontology/08AE/webern'], 'shortname': 'webern', 'description': [{ 'value': 'Historisch-kritische Edition des Gesamtschaffens von Anton Webern.' }], 'shortcode': '08AE', 'logo': null, 'id': 'http://rdfh.ch/projects/08AE', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Anton Webern Gesamtausgabe' }, { 'ontologies': ['http://www.knora.org/ontology/0802/biblio'], 'shortname': 'biblio', 'description': [{ 'value': 'Bibliography' }], 'shortcode': '0802', 'logo': null, 'id': 'http://rdfh.ch/projects/DczxPs-sR6aZN91qV92ZmQ', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Bibliography' }, { 'ontologies': ['http://www.knora.org/ontology/0801/beol'], 'shortname': 'beol', 'description': [{ 'value': 'Bernoulli-Euler Online' }], 'shortcode': '0801', 'logo': null, 'id': 'http://rdfh.ch/projects/yTerZGyxjZVqFMNNKXCDPF', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Bernoulli-Euler Online' }, { 'ontologies': ['http://www.knora.org/ontology/standoff', 'http://www.knora.org/ontology/knora-base', 'http://www.knora.org/ontology/salsah-gui'], 'shortname': 'SystemProject', 'description': [{ 'value': 'Knora System Project', 'language': 'en' }], 'shortcode': 'FFFF', 'logo': null, 'id': 'http://www.knora.org/ontology/knora-base#SystemProject', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Knora System Project' }] };
export const projectsResponse: ProjectsResponse = jsonConvert.deserializeObject(projectsResponseJson, ProjectsResponse);
export const projectsTestData: Project[] = projectsResponse.projects;

export const imagesProjectIri = 'http://rdfh.ch/projects/00FF';
export const imagesProjectResponseJson: any = { 'project': { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' } };
export const imagesProjectResponse: ProjectResponse = jsonConvert.deserializeObject(imagesProjectResponseJson, ProjectResponse);
export const imagesProject: Project = imagesProjectResponse.project;

export const incunabulaProjectIri = 'http://rdfh.ch/projects/0803';
export const incunabulaProjectResponseJson: any = { 'project': { 'ontologies': ['http://www.knora.org/ontology/0803/incunabula'], 'shortname': 'incunabula', 'description': [{ 'value': '<p>Das interdisziplinäre Forschungsprojekt \'<b><em>Die Bilderfolgen der Basler Frühdrucke: Spätmittelalterliche Didaxe als Bild-Text-Lektüre</em></b>\' verbindet eine umfassende kunstwissenschaftliche Analyse der Bezüge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der Bestände der Universitätsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgeführt vom <a href=\'http://kunsthist.unibas.ch\'>Kunsthistorischen Seminar</a> der Universität Basel (Prof. B. Schellewald) und dem <a href=\'http://www.dhlab.unibas.ch\'>Digital Humanities Lab</a> der Universität Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas Kernstück der digitalen Edition besteht aus rund zwanzig reich bebilderten Frühdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfältige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine,  die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und Erbauungsbüchlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berühmte Narrenschiff  sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser Frühdrucke  durch die Möglichkeiten nichtlinearer Verknüpfung und Kommentierung der Bilder und Texte, für die wissenschaftliche Edition sowie für die Erforschung der Bilder und Texte nutzbar machen. Auch können bereits bestehende und entstehende Online-Editionen damit verknüpft  werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>' }], 'shortcode': '0803', 'logo': 'incunabula_logo.png', 'id': 'http://rdfh.ch/projects/0803', 'status': true, 'selfjoin': false, 'keywords': ['Basel', 'Basler Frühdrucke', 'Bilderfolgen', 'Contectualisation of images', 'Inkunabel', 'Kunsthistorisches Seminar Universität Basel', 'Late Middle Ages', 'Letterpress Printing', 'Narrenschiff', 'Sebastian Brant', 'Wiegendrucke', 'early print', 'incunabula', 'ship of fools'], 'longname': 'Bilderfolgen Basler Frühdrucke' } };
export const incunabulaProjectResponse: ProjectResponse = jsonConvert.deserializeObject(incunabulaProjectResponseJson, ProjectResponse);
export const incunabulaProject: Project = incunabulaProjectResponse.project;

export const anythingProjectIri = 'http://rdfh.ch/projects/anything';
export const anythingProjectResponseJson: any = { 'project': { 'ontologies': ['http://www.knora.org/ontology/anything'], 'shortname': 'anything', 'description': [{ 'value': 'Anything Project' }], 'shortcode': null, 'logo': null, 'id': 'http://rdfh.ch/projects/anything', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Anything Project' } };
export const anythingProjectResponse: ProjectResponse = jsonConvert.deserializeObject(anythingProjectResponseJson, ProjectResponse);
export const anythingProject: Project = anythingProjectResponse.project;


// ---- Groups ----
export const groupsResponseJson: any = { 'groups': [{ 'name': 'Image reviewer', 'project': { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, 'description': 'A group for image reviewers.', 'id': 'http://rdfh.ch/groups/00FF/images-reviewer', 'status': true, 'selfjoin': false }] };
export const groupsResponse: GroupsResponse = jsonConvert.deserializeObject(groupsResponseJson, GroupsResponse);
export const groupsTestData: Group[] = groupsResponse.groups;


export const imagesReviewerGroupResponseJson: any = { 'group': { 'name': 'Image reviewer', 'project': { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, 'description': 'A group for image reviewers.', 'id': 'http://rdfh.ch/groups/00FF/images-reviewer', 'status': true, 'selfjoin': false } };
export const imagesReviewerGroupResponse: GroupResponse = jsonConvert.deserializeObject(imagesReviewerGroupResponseJson, GroupResponse);
export const imagesReviewerGroup: Group = imagesReviewerGroupResponse.group;


// ---- Users ----
export const usersResponseJson: any = {'users': [{'familyName': 'Admin-alt', 'givenName': 'Administrator-alt', 'email': 'root-alt@example.com', 'username': 'root-alt', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/91e19f1e01', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'User02', 'email': 'user02.user@example.com', 'username': 'user02.user', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/97cec4000f', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User01', 'givenName': 'Anything', 'email': 'anything.user01@example.org', 'username': 'anything.user01', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/9XBCrDV3SRa7kS1WwynB4Q', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'Admin', 'givenName': 'Anything', 'email': 'anything.admin@example.org', 'username': 'anything.admin', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/AnythingAdminUser', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User02', 'givenName': 'Anything', 'email': 'anything.user02@example.org', 'username': 'anything.user02', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/BhkfBc3hTeS_IDo-JgXRbQ', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'BEOL', 'givenName': 'BEOL', 'email': 'beol@example.com', 'username': 'beol', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/PSGbemdjZi4kQ6GHJVkLGE', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'BEOL', 'givenName': 'BEOL', 'email': 't.schweizer@unibas.ch', 'username': 't.schweizer', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/PSGbemdjZi4kQ6GHJVkLGF', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'Test', 'givenName': 'User', 'email': 'user.test@example.com', 'username': 'user.test', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/b83acc5f05', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'User01', 'email': 'user01.user1@example.com', 'username': 'user01.user1', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/c266a56709', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'User03', 'email': 'images-reviewer-user@example.com', 'username': 'images-reviewer-user', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/images-reviewer-user', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'Inactive', 'email': 'inactive.user@example.com', 'username': 'inactiveuser', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/inactiveuser', 'status': false, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User2', 'givenName': 'Test', 'email': 'test.user2@test.ch', 'username': 'incunabulaMemberUser', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/incunabulaMemberUser', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'Multi', 'email': 'multi.user@example.com', 'username': 'multiuser', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/multiuser', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'Normal', 'email': 'normal.user@example.com', 'username': 'normaluser', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/normaluser', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'Administrator', 'givenName': 'System', 'email': 'root@example.com', 'username': 'root', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/root', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'User', 'givenName': 'Super', 'email': 'super.user@example.com', 'username': 'superuser', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/superuser', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'Webern', 'givenName': 'Admin', 'email': 'webern-admin@example.ch', 'username': 'webern-admin', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/webernProjectAdmin', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}, {'familyName': 'Webern', 'givenName': 'Nutzer', 'email': 'webern-nutzer@example.ch', 'username': 'webern-nutzer', 'permissions': {'groupsPerProject': {}, 'administrativePermissionsPerProject': {}}, 'groups': [], 'id': 'http://rdfh.ch/users/webernProjectMember', 'status': true, 'token': null, 'sessionId': null, 'projects': [], 'lang': 'de', 'password': null}]};
export const usersResponse: UsersResponse = jsonConvert.deserializeObject(usersResponseJson, UsersResponse);
export const usersTestData: User[] = usersResponse.users;

export const multiUserResponseJson: any = { 'user': { 'familyName': 'User', 'givenName': 'Multi', 'email': 'multi.user@example.com', 'username': 'multiuser', 'permissions': { 'groupsPerProject': { 'http://rdfh.ch/projects/0803': ['http://www.knora.org/ontology/knora-base#ProjectMember', 'http://www.knora.org/ontology/knora-base#ProjectAdmin'], 'http://rdfh.ch/projects/00FF': ['http://rdfh.ch/groups/00FF/images-reviewer', 'http://www.knora.org/ontology/knora-base#ProjectMember', 'http://www.knora.org/ontology/knora-base#ProjectAdmin'], 'http://rdfh.ch/projects/0001': ['http://www.knora.org/ontology/knora-base#ProjectMember', 'http://www.knora.org/ontology/knora-base#ProjectAdmin']}, 'administrativePermissionsPerProject': { 'http://rdfh.ch/projects/0803': [{ 'name': 'ProjectAdminAllPermission', 'additionalInformation': null, 'permissionCode': null}, { 'name': 'ProjectResourceCreateAllPermission', 'additionalInformation': null, 'permissionCode': null}], 'http://rdfh.ch/projects/00FF': [{ 'name': 'ProjectAdminAllPermission', 'additionalInformation': null, 'permissionCode': null}, { 'name': 'ProjectResourceCreateAllPermission', 'additionalInformation': null, 'permissionCode': null}], 'http://rdfh.ch/projects/0001': [{ 'name': 'ProjectAdminAllPermission', 'additionalInformation': null, 'permissionCode': null}, { 'name': 'ProjectResourceCreateAllPermission', 'additionalInformation': null, 'permissionCode': null}]}}, 'groups': [{ 'name': 'Image reviewer', 'project': { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, 'description': 'A group for image reviewers.', 'id': 'http://rdfh.ch/groups/00FF/images-reviewer', 'status': true, 'selfjoin': false}], 'id': 'http://rdfh.ch/users/multiuser', 'status': true, 'token': null, 'sessionId': null, 'projects': [{ 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, { 'ontologies': ['http://www.knora.org/ontology/0803/incunabula'], 'shortname': 'incunabula', 'description': [{ 'value': '<p>Das interdisziplinäre Forschungsprojekt \'<b><em>Die Bilderfolgen der Basler Frühdrucke: Spätmittelalterliche Didaxe als Bild-Text-Lektüre</em></b>\' verbindet eine umfassende kunstwissenschaftliche Analyse der Bezüge zwischen den Bildern und Texten in den illustrierten Basler Inkunabeln mit der Digitalisierung der Bestände der Universitätsbibliothek und der Entwicklung einer elektronischen Edition in der Form einer neuartigen Web-0.2-Applikation.\n</p>\n<p>Das Projekt wird durchgeführt vom <a href=\'http://kunsthist.unibas.ch\'>Kunsthistorischen Seminar</a> der Universität Basel (Prof. B. Schellewald) und dem <a href=\'http://www.dhlab.unibas.ch\'>Digital Humanities Lab</a> der Universität Basel (PD Dr. L. Rosenthaler).\n</p>\n<p>\nDas Kernstück der digitalen Edition besteht aus rund zwanzig reich bebilderten Frühdrucken aus vier verschiedenen Basler Offizinen. Viele davon sind bereits vor 1500 in mehreren Ausgaben erschienen, einige fast gleichzeitig auf Deutsch und Lateinisch. Es handelt sich um eine ausserordentlich vielfältige Produktion; neben dem Heilsspiegel finden sich ein Roman, die Melusine,  die Reisebeschreibungen des Jean de Mandeville, einige Gebets- und Erbauungsbüchlein, theologische Schriften, Fastenpredigten, die Leben der Heiligen Fridolin und Meinrad, das berühmte Narrenschiff  sowie die Exempelsammlung des Ritters vom Thurn.\n</p>\nDie Internetpublikation macht das digitalisierte Korpus dieser Frühdrucke  durch die Möglichkeiten nichtlinearer Verknüpfung und Kommentierung der Bilder und Texte, für die wissenschaftliche Edition sowie für die Erforschung der Bilder und Texte nutzbar machen. Auch können bereits bestehende und entstehende Online-Editionen damit verknüpft  werden , wodurch die Nutzung von Datenbanken anderer Institutionen im Hinblick auf unser Corpus optimiert wird.\n</p>' }], 'shortcode': '0803', 'logo': 'incunabula_logo.png', 'id': 'http://rdfh.ch/projects/0803', 'status': true, 'selfjoin': false, 'keywords': ['Basel', 'Basler Frühdrucke', 'Bilderfolgen', 'Contectualisation of images', 'Inkunabel', 'Kunsthistorisches Seminar Universität Basel', 'Late Middle Ages', 'Letterpress Printing', 'Narrenschiff', 'Sebastian Brant', 'Wiegendrucke', 'early print', 'incunabula', 'ship of fools'], 'longname': 'Bilderfolgen Basler Frühdrucke' }, { 'ontologies': ['http://www.knora.org/ontology/0001/anything', 'http://www.knora.org/ontology/0001/something'], 'shortname': 'anything', 'description': [{ 'value': 'Anything Project' }], 'shortcode': '0001', 'logo': null, 'id': 'http://rdfh.ch/projects/0001', 'status': true, 'selfjoin': false, 'keywords': [], 'longname': 'Anything Project' }], 'lang': 'de', 'password': null}};
export const multiUserResponse: UserResponse = jsonConvert.deserializeObject(multiUserResponseJson, UserResponse);
export const multiUser: User = multiUserResponse.user;

export const imagesUserResponseJson: any = { 'user': { 'familyName': 'User', 'givenName': 'User03', 'email': 'images-reviewer-user@example.com', 'username': 'images-reviewer-user', 'permissions': { 'groupsPerProject': { 'http://rdfh.ch/projects/00FF': ['http://rdfh.ch/groups/00FF/images-reviewer', 'http://www.knora.org/ontology/knora-base#ProjectMember']}, 'administrativePermissionsPerProject': { 'http://rdfh.ch/projects/00FF': [{ 'name': 'ProjectResourceCreateRestrictedPermission', 'additionalInformation': 'http://www.knora.org/ontology/00FF/images#bildformat', 'permissionCode': null}, { 'name': 'ProjectResourceCreateRestrictedPermission', 'additionalInformation': 'http://www.knora.org/ontology/00FF/images#bild', 'permissionCode': null}]}}, 'groups': [{ 'name': 'Image reviewer', 'project': { 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }, 'description': 'A group for image reviewers.', 'id': 'http://rdfh.ch/groups/00FF/images-reviewer', 'status': true, 'selfjoin': false}], 'id': 'http://rdfh.ch/users/images-reviewer-user', 'status': true, 'token': null, 'sessionId': null, 'projects': [{ 'ontologies': ['http://www.knora.org/ontology/00FF/images'], 'shortname': 'images', 'description': [{ 'value': 'A demo project of a collection of images', 'language': 'en' }], 'shortcode': '00FF', 'logo': null, 'id': 'http://rdfh.ch/projects/00FF', 'status': true, 'selfjoin': false, 'keywords': ['collection', 'images'], 'longname': 'Image Collection Demo' }], 'lang': 'de', 'password': null}};
export const imagesUserResponse: UserResponse = jsonConvert.deserializeObject(imagesUserResponseJson, UserResponse);
export const imagesUser: User = imagesUserResponse.user;

// ---- Lists ----
export const listsResponseJson: any =  { 'lists': [{ 'id': 'http: //rdfh.ch/lists/FFFF/ynm01', 'labels': [{ 'value': 'Die Ja,  Nein,  Vielleicht Liste', 'language': 'de' }, { 'value': 'The Yes,  No,  Maybe List', 'language': 'en' }], 'projectIri': 'http: //www.knora.org/ontology/knora-base#SystemProject', 'isRootNode': true, 'comments': [{ 'value': 'Diese Liste kann von allen Projekten verwendet werden.', 'language': 'de' }, { 'value': 'This list can be used by all projects.', 'language': 'en' }]}]};
export const listsResponse: ListsResponse = jsonConvert.deserializeObject(listsResponseJson, ListsResponse);
export const listsTestData: ListNodeInfo[] = listsResponse.lists;

export const yesNoMaybeListResponseJson: any = { 'list': { 'listinfo': { 'id': 'http://rdfh.ch/lists/FFFF/ynm01', 'projectIri': 'http://www.knora.org/ontology/knora-base#SystemProject', 'labels': [{ 'value': 'The Yes, No, Maybe List', 'language': 'en' }, { 'value': 'Die Ja, Nein, Vielleicht Liste', 'language': 'de' }], 'comments': [{ 'value': 'This list can be used by all projects.', 'language': 'en' }, { 'value': 'Diese Liste kann von allen Projekten verwendet werden.', 'language': 'de' }] }, 'children': [{ 'children': [], 'name': 'yes', 'id': 'http://rdfh.ch/lists/FFFF/ynm01-01', 'labels': [{ 'value': 'Yes' }], 'position': 0, 'comments': [] }, { 'children': [], 'name': 'no', 'id': 'http://rdfh.ch/lists/FFFF/ynm01-02', 'labels': [{ 'value': 'No' }], 'position': 1, 'comments': [] }, { 'children': [], 'name': 'maybe', 'id': 'http://rdfh.ch/lists/FFFF/ynm01-03', 'labels': [{ 'value': 'Maybe' }], 'position': 2, 'comments': [] }] } };
export const yesNoMaybeListResponse: ListResponse = jsonConvert.deserializeObject(yesNoMaybeListResponseJson, ListResponse);
export const yesNoMaybeListTestData: List = yesNoMaybeListResponse.list;

export const yesNodeInfoResponseJson: any = { 'nodeinfo': { 'name': 'yes', 'id': 'http://rdfh.ch/lists/FFFF/ynm01-01', 'labels': [{ 'value': 'Yes', 'language': 'en' }, { 'value': 'Ja', 'language': 'de' }], 'position': 0, 'comments': [] } };
export const yesNodeInfoResponse: ListNodeInfoResponse = jsonConvert.deserializeObject(yesNodeInfoResponseJson, ListNodeInfoResponse);
export const yesNodeInfoTestData: ListNodeInfo = yesNodeInfoResponse.nodeinfo;

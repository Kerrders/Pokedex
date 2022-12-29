import { Pipe, PipeTransform } from '@angular/core';
import { LanguageHelper } from '../helpers/languageHelper';
import versionNames from '../../assets/data/version_names.json';
import versionsData from '../../assets/data/versions.json';
import versionGroups from '../../assets/data/version_groups.json';

@Pipe({
  name: 'versionName',
})
export class VersionNamePipe implements PipeTransform {
  transform(groupVersionName: string): string {
    if (!groupVersionName?.length) {
      return 'UNKNOWN_VERSION';
    }
    const versions = groupVersionName?.split('-');
    if (versions.length <= 1) {
      return this._getVersionName(this._getVersionId(versions[0]));
    }

    let foundVersions: Array<string> = [];
    let value = '';
    versions.forEach((version) => {
      value += version;
      const foundVersion = this._getVersionId(value);
      if (foundVersion !== '0') {
        foundVersions.push(foundVersion);
        value = '';
      }
    });

    foundVersions = foundVersions.map((version) => {
      return this._getVersionName(version);
    });
    return foundVersions.join('/');
  }

  private _getVersionName(versionId: string): string {
    console.log(versionId);
    return (
      versionNames.find(
        (versionName) =>
          versionName.version_id === versionId &&
          versionName.local_language_id &&
          parseInt(versionName.local_language_id) ===
            LanguageHelper.getLanguageId()
      )?.name ?? 'UNKNOWN'
    );
  }

  private _getVersionId(versionName: string): string {
    const foundVersion = versionsData.find(
      (version) => version.identifier === versionName
    );
    return foundVersion?.id ?? '0';
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import versionNames from '../../assets/data/version_names.json';
import versionsData from '../../assets/data/versions.json';
import versionGroups from '../../assets/data/version_groups.json';

@Pipe({
  name: 'versionName',
})
export class VersionNamePipe implements PipeTransform {
  transform(groupVersionName: string, languageId: number): string {
    if (!groupVersionName?.length) {
      return 'UNKNOWN_VERSION';
    }

    const versionGroupId = versionGroups.find(
      (versionGroup) => versionGroup.identifier === groupVersionName
    )?.id;
    if (!versionGroupId) {
      return groupVersionName;
    }

    const versions = versionsData
      .filter((version) => version.version_group_id === versionGroupId)
      .map((version) => this._getVersionName(version.id as string, languageId));
    return versions.join('/');
  }

  private _getVersionName(versionId: string, languageId: number): string {
    return (
      versionNames.find(
        (versionName) =>
          versionName.version_id === versionId &&
          versionName.local_language_id &&
          parseInt(versionName.local_language_id) === languageId
      )?.name ?? 'UNKNOWN'
    );
  }
}

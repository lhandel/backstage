/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';
import { createRouter } from '@backstage/plugin-permission-backend';
import {
  AuthorizeResult,
  isResourcePermission,
  PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';

import {
  createScaffolderStepConditionalDecision,
  scaffolderStepConditions,
} from '@backstage/plugin-scaffolder-backend';
import { RESOURCE_TYPE_SCAFFOLDER_STEP } from '@backstage/plugin-scaffolder-common';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

class ExamplePermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    _user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    /**
     * This is an example of how to use the scaffolder step conditions.
     */
    if (
      isResourcePermission(request.permission, RESOURCE_TYPE_SCAFFOLDER_STEP)
    ) {
      return createScaffolderStepConditionalDecision(
        request.permission,
        scaffolderStepConditions.hasTag({ tag: 'example' }),
      );
    }

    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    config: env.config,
    logger: env.logger,
    discovery: env.discovery,
    policy: new ExamplePermissionPolicy(),
    identity: env.identity,
  });
}

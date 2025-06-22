<script setup lang="ts">
 import {
  Home,
  Calendar,
  ChevronUp,
  UserCheck2,
  LogOut,
  User2,
  CreditCard
} from 'lucide-vue-next';
import { signOut } from 'firebase/auth';
import { Icon } from '@iconify/vue'

const auth = useFirebaseAuth()
const userName = useCurrentUser()
// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Records',
    url: 'records',
    icon: Calendar,
  },
]

// esto funciona correctamente
const handleSignOut = () => {
  if (auth) {
    signOut(auth)
  } 
}

const mode = useColorMode()
//const isDark = () => mode.value === 'dark'
const toggleDark = () => {
  mode.preference = mode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Sidebar>
    <SidebarHeader />

    <!-- content -->
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child>
                    <NuxtLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <Separator orientation="horizontal" />
    
    <!-- footer-->
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton>
                <UserCheck2 /> {{ userName?.displayName ?? userName?.email }}
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <User2  class="mr-2"/>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="toggleDark">
                <Icon icon="radix-icons:moon" class="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Icon icon="radix-icons:sun" class="mr-2 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Theme</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard  class="mr-2"/>
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="handleSignOut">
                <LogOut class="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

  </Sidebar>
</template>